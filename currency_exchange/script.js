const currencyOne= document.getElementById('currency-one');
const amountCurrencyOne=document.getElementById('amount-one');
const currencytwo= document.getElementById('currency-two');
const amountCurrencytwo= document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swat= document.getElementById('swap');

// fetch exchange rates and update the dom
function calculate(){
//Get the Curency code for currency 1 and 2
const currencyOneCode = currencyOne.value;
const currencyTwoCode = currencytwo.value;
// send request to exchangeRate API for conversion rates for currency one
fetch(`https://v6.exchangerate-api.com/v6/7aa4051584aec9f23b9f6385/pair/${currencyOneCode}/${currencyTwoCode}`)
.then(res=>res.json())
.then(data=>{
//Get the conversion Rate from currency one to currency two
const conversionRate =data.conversion_rate;
rate.innerText = `1 ${currencyOneCode} = ${conversionRate} ${currencyTwoCode}`; 
//update the currency two amount
amountCurrencytwo.value = (amountCurrencyOne.value * conversionRate).toFixed(2);
}
);


//update the DOM to display the conversion rate


};

//event listners

//re calculate exchange rates when currency 1 change
currencyOne.addEventListener('change',calculate);

// recalculate exchange amount when currency 1 amount changes
amountCurrencyOne.addEventListener('input',calculate);

//recalculate when currency two change
currencytwo.addEventListener('change',calculate);

//recalculate when currency two change
amountCurrencytwo.addEventListener('change',calculate);

swap.addEventListener('click',()=>{
    const temp = currencyOne.value;
    currencyOne.value=currencytwo.value;
    currencytwo.value=temp;
    calculate();
})

// execute calculate funtion in page load
calculate();