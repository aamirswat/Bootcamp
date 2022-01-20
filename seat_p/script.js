const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.accupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect=document.getElementById('movie');
let ticketPrice=+movieSelect.value;

populateUI();

function updateSelectedCount(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected');
    const seatsIndex =[...selectedSeats].map(seat=>[...seats].indexOf(seat));
    const selectedSeatsCount= selectedSeats.length;
    count.innerText=selectedSeatsCount;
    total.innerText=selectedSeatsCount*ticketPrice;
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
}

//event listeners
//1.event listener for container to check for click on seats

container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')
    ){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})
//save the movie data to local storage
function setMovieData(moiveIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',moiveIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
    
}

function populateUI(){
 const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
 if(selectedSeats !== null && selectedSeats.length > 0){
     seats.forEach((seat, index) =>{
         if(selectedSeats.indexOf(index)>-1){
             seat.classList.add('selected')
         }
             })
 };
 const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');
 if(selectedMovieIndex!==null){
     movieSelect.selectedIndex=selectedMovieIndex;
 }
 
}

// 2. Event listener for movie select
movieSelect.addEventListener('change',e=>{
    ticketPrice=+e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
})

// initiate moive selection count
updateSelectedCount();