//get dom elements
const word = document.getElementById('word');
const incorretLetters=document.getElementById('incorret-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playBtn = document.getElementById('play-btn');
const notification=document.getElementById('notification-container');


// Get DOM Elements for Hangman
const figurePart = document.querySelectorAll('.figure-part');

// this is the pool of words which will be used to select
const words = ["ants","auto","baseball","center","transportation","dead","moon","sure","needle","cloth","ought","individual","date","delicious","Diamond","mass","known","exciting","steam","around","may","eleven","trail","never","fighting","birth","thought","opinion","except","slip","plane","shall","torn","coach","doubt","information","public","moon","slipped","stepped","speak","ground","audience","gate","help"];

//select a word at random from words array

let selectWord=words[Math.floor(Math.random()*words.length)];

//tracking arrays for correct and incorrect guesses
const correctLettersArray=[];
const incorrectLettersArray=[];

// function to display the selected word in the DOM
function displayword(){
    //Display the selected word
    word.innerHTML=`
    ${selectWord
    .split('')
    .map(letter=>`
    <span class="letter">
    ${correctLettersArray.includes(letter)?letter:''}
    </span>`
    )
    .join('')
    } 
     `;
     // Replace New Line character and form inner word
     const innerWord=word.innerText.replace(/\n/g,'');
     //compare inner word to selected word if its 
     if(innerWord===selectWord){
         finalMessage.innerText='Congratulations! You won!';
         popup.style.display='flex';
     }
}
;

//function to show the notification
function showNotification(){
    notification.classList.add('show');
//after 2 seconds hide the notification
setTimeout(()=>{notification.classList.remove('show');
},2000);
}

//function to update incorrect letters
function updateIncorrectLetters(){
    //display the incorrect letters
    incorretLetters.innerHTML=`
    ${incorrectLettersArray.length> 0 ? '<p>Incorrect letters</p>' :  '' } 
    ${incorrectLettersArray.map(letter =>`<span>${letter}</span>`)}
    `;

    // display the hangman part
    figurePart.forEach((part, index)=>{
        //how many incorrect letters has the user guess
        const errors = incorrectLettersArray.length;
        if(index <errors){
            part.style.display='block';
        }else{
            part.style.display='none';
        }
    });
    //check if user lost
    if(incorrectLettersArray.length===figurePart.length){
        
        finalMessage.innerText='You Lost!';
        popup.style.display='flex';
    }
}

//event Handlers
// 1. Listen for keyboard key press
window.addEventListener('keydown', e=> {
// check if key pressed is letter a=65 and z=90
    if(e.keyCode>=65 && e.keyCode <=90){
        const letter =e.key;
        // check if letter is in the selected word
    if(selectWord.includes(letter)){
      //check if letter is already in correctLettersArray
if(!correctLettersArray.includes(letter)){
         // Add letter into the correctLetterArray
      correctLettersArray.push(letter);
     //Run the display word function again to display new letter
     displayword();
    } else {
      showNotification();
    } 
    }else{
        //check if letter is already in incorrectLetter array
        if(!incorrectLettersArray.includes(letter)){
            //Add letter into the incorrectLetterArray
        incorrectLettersArray.push(letter);
        //update the incorrect letters UI
        updateIncorrectLetters();
        }else{
           showNotification(); 
        }
    }
    }
    })


//.2 Listen for click on play again button
playBtn.addEventListener('click',()=>{
    //empty correct incorrectArrays
    correctLettersArray.splice(0);
    incorrectLettersArray.splice(0);
    // select new random word
    selectWord=words[Math.floor(Math.random()*words.length)];
    //clear incorrect letters display
    updateIncorrectLetters();
    // hide the popup
    popup.style.display='none';
    //refresh displayed word
    displayword(); 


})

// execute displayword on page load
displayword();