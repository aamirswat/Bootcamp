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
function validateEmail(input) {
const re=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if(re.test(input.value.trim())){
showSucess(input)
}else{
    showError(input,`please provide a valid email`)
}

}

function checkPasswordmatch(input1,input2){
    if(input1.value!==input2.value){
        showError(input2,'Password dont match');
    
}
}

//function to check if required fields have data
function checkRequired(inputArray){
inputArray.forEach(function(input){
    if(input.value==''){
        showError(input,`${getFieldId(input)} is required`)
    }else{
        showSucess(input);
    }
});         
}

//function to check length of input field
function checkLength(input,min,max){
    if (input.value.length<min){
        showError(input,`${getFieldId(input)} need to be at least ${min} characters`);
    }else if(input.value.length>max){
        showError(input,`${getFieldId(input)} needs to be less than ${max} characters`);
    }else{
        showSucess(input);
    }
}

function getFieldId(input ){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// create event listner for submit button
form.addEventListener('submit', function(e){
    e.preventDefault();   
    //check if username is empty
    checkRequired([username,email,password,password2]);
    // check length of username and password
    checkLength(username,3,10);
    checkLength(password,6,30);
    validateEmail(email);
    checkPasswordmatch(password,password2);

    });
