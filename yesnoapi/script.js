// API

/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API
 * 
 * 2. Output the API's response
 * 
 * 3. Attach fetchAnswer to an event listener
 * 
 * 4. Clear output after 3 seconds
 * 
 * 5. Optional: add loading/error states
 *
 */

const API_ENDPOINT = 'https://yesno.wtf/api';

//         <button id="button" type="submit" class="button">

const ballSelector = document.querySelector('#ball');
const buttonSelector = document.querySelector('#button');
const inputSelector =  document.querySelector('#input');

let isRequestinProgress = false;

const disableButton = () => {
    buttonSelector.setAttribute('disabled', 'disabled');
}

const cleanupResponse = () => {
    setTimeout(() => {
        isRequestinProgress = false;
        document.querySelector('#answer').innerHTML = '';
        inputSelector.value = ''
        buttonSelector.removeAttribute('disabled');
    }, 3000);
}

const showAnswer = answer => {

    setTimeout(() => {
        document.querySelector('#answer').innerHTML = `<p>${answer}</p>`;
        //remove shake after finish
        ballSelector.classList.remove('shake__ball');
        cleanupResponse();
    }, 1000)
}

const fetchAnswer = () => {
    //add shake anim
    isRequestinProgress = true;
    disableButton();
    ballSelector.classList.add('shake__ball');
    fetch(API_ENDPOINT).then(data => data.json()).then(data => showAnswer(data.answer));
}

const handleKeyEnter = e => {
    if(isRequestinProgress) return;
    if(!inputSelector.value) return;
    if(e.keyCode == 13) {
        fetchAnswer();
    }
}

buttonSelector.addEventListener('click', () => {
    if(isRequestinProgress) return;
    fetchAnswer();
})