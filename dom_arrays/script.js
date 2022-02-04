//get DOM element
const main= document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const filterBtn=document.getElementById('filter');
const sortBtn=document.getElementById('sort');
const sumBtn=document.getElementById('sum');

// initialize user data array
let data=[];

//fetch random user from randomuser.me API
async function getRandomUser(){
   const res=await fetch('https://randomuser.me/api/')
   //wait for response to convert in JSON
   const data=await res.json();
 
   // get the user name
   const user =data.results[0];
  // create the new user
  const newUser = {
      name:`${user.name.title} ${user.name.first} ${user.name.last}`,
      balance:Math.floor(Math.random()*100000),
  }  

// Add the new user into the data array
addData(newUser);

};

//funcation to add user data into user data array
function addData(newUser){
    data.push(newUser);
    //update the DOM to display user to the data array
    updateDOM();   
}


//function to filter only Millionairs users
function filterUsers(){
    //filter out all users whose balance is less than million
    data=data.filter(user =>user.balance>=1000000);
    updateDOM();
}

//function for sorting data by balance
function sortbyBalance(){
    //sort data by balance using compare function inside sort
   data= data.sort((a,b)=>b.balance-a.balance);
   updateDOM();
}

//function to sum all users balance
function totalBalance(){
    updateDOM();
// add up all balance from all users
//accumulator starts at 0 and adds the current users balance for each iteration
 const balance = data.reduce((acc,user)=>((acc+=user.balance)),0);
 const balanceElement=document.createElement("div");
 //set the innerHTML for new div
 balanceElement.innerHTML=`<h3>Total Balance : ${formatNumberToDoller(balance)}</h3>`;
 //appned balance in main element
 main.appendChild(balanceElement); 

}
//function to double Money of All Users
function doubleMoney(){
    //Loop through all users in the user data array
    //for each user return the user data
    //overwrite the data array with the new data array created by map

    data=data.map(user=>{
        return {...user, balance:user.balance*2}
    })

    //update the DOM using the new user data array
    updateDOM();
}

//function to format random number as money
function formatNumberToDoller(number){
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}

//update the UI with data from the user data array
function updateDOM(userData= data){
// clear previous UI
main.innerHTML='<h2><strong>User</strong>Wealth</h2>'
//loop through userdata and render the UI
userData.forEach(user=>{
    //create a new div element for the user
const userDiv=document.createElement('div');
//Apply the user class to the new div
userDiv.classList.add('user');
//add inner HTML to the user div
userDiv.innerHTML= `<strong>${user.name}</strong>
                            ${formatNumberToDoller(user.balance)}`
//add the new element into the DOM
main.appendChild(userDiv);

});

}


//event listner 

//1. Listen for click on Add user button
addUserBtn.addEventListener('click',getRandomUser);

//2. listen for click on the Double button
doubleBtn.addEventListener('click',doubleMoney); 

//3 . filter buttomn
filterBtn.addEventListener('click',filterUsers);

//4. Listen for click on sort Button

sortBtn.addEventListener('click',sortbyBalance);

// 5. Listen for Click on Sum Button
sumBtn.addEventListener('click', totalBalance);