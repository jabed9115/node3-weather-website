const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent='from jS';

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const location = search.value;
    console.log(location);

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent= data.error;
                messageTwo.textContent= '';
            }
            else{
                messageOne.textContent= data.forecast+' '+data.temperature;
                messagetwo.textContent= data.location;

            }
        });
    });
});