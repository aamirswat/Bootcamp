// retriving HTML element by the DOM
const form=document.getElementById('form');
const username=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');
const password2=document.getElementById('password2');

// funciton to update class and message for errors
 
function showError(input,message){
// get parrent element of the input
const formControl=input.parentElement;
// override the class -add error
formControl.className='form-control error'
// Get the small element for the error message
const small=formControl.querySelector('small');
// override the text for smll element using the input message
small.innerText=message;
}

function showSucess(input){
    //Get the parent element of the input field 
    const formControl=input.parentElement;
    formControl.className='form-control success'
}

//validate email
function validateEmail(email) {
const re=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(String(email).toLocaleLowerCase());
}


// create event listner for submit button
form.addEventListener('submit', function(e){
    e.preventDefault();   
    //check if username is empty
    if(username.value==""){
    showError(username,'username is require');
   }else{
       showSucess(username);
   }
    //check if email is empty
   if(email.value==""){
    showError(email,'email is require');
   }
   else if(!validateEmail(email.value)){
       showError(email,'email is invalid');
   }
   else{
       showSucess(email);
   }
   
    //check if password is empty
    if(password.value==""){
     showError(password,'password is require');
    }else{
     showSucess(password);
    }

    //check if confirm password is empty
    if(password2.value==""){
        showError(password2,'Confirm Password is require');
       }else{
        showSucess(password2);
       }
   

    });
