/**
 * 1. Initialize an XMLHttpRequest constructor
 * 2. Open a GET request, set the headers and response type
 * 3. Output successful response
 * 4. Output error state
 * 5. Combine with an event listener (button)
 * 6. Adjust UI states accordingly
 * 7. Bonus: change button CTA to indicate if it's the first joke or a "next" one
 */

const API_ENDPOINT = 'https://icanhazdadjoke.com/';

const answerSelector = document.getElementById('joke');
const errorSelector = document.getElementById('error-message');
const buttonSelector = document.querySelector('#button');
const loaderSelector = document.getElementById('loader');
const buttonText = document.getElementById('cta');

// * 1. Initialize an XMLHttpRequest constructor
const XHR = new XMLHttpRequest();

// * 6. Adjust UI states accordingly
function showJoke(joke) {
    setLoaderState(false);
    setButtonState(false);
    answerSelector.innerHTML = joke;
}

function showError(error) {
    setLoaderState(false);
    setButtonState(false);
    answerSelector.innerHTML = error;
}

function setLoaderState(isVisible) {
    const displayState = isVisible ? 'block' : 'none';
    loaderSelector.style.display = displayState;
}

//Navadi se disablat spammanje 

function setButtonState(isDisabled) {
    if(isDisabled) {
        buttonSelector.setAttribute('disabled', 'disabled');
        buttonText.style.display = 'none';
    } else {
        buttonSelector.removeAttribute('disabled');
        buttonText.style.display = 'block';
    }

}

//* 7. Bonus: change button CTA to indicate if it's the first joke or a "next" one

function setButtonCTA(isError) {
    const buttonCta = isError ? 'Try again' : 'Get another one';
    buttonText.innerHTML = buttonCta;
}

// * 2. Open a GET request, 
function getJoke() {
    XHR.open('GET', API_ENDPOINT);

    //set the headers and response type
    XHR.setRequestHeader('Accept', 'application/json')
    XHR.responseType = 'json';
    console.log(XHR);

    //* 3. Output successful response
    //XHR.onLoad = callback;

    XHR.onload = function () {
        console.log(XHR.response.joke)
        showJoke(XHR.response.joke);
        setButtonCTA(false)
    }

    // * 4. Output error state  ||this is a callback function btw
    XHR.onerror = function () {
        showError('An error occured, sorry !') 
        setButtonCTA(true)
    }

    XHR.send();
}

//<button id="button" class="button" type="button">
//* 5. Combine with an event listener (button)

buttonSelector.addEventListener('click', () => {
    setButtonState(true);
    setLoaderState(true);
    getJoke();
})
