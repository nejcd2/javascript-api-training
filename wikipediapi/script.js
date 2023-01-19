/**
 * STEPS:
 *
 * 1. Extract all selectors, create helper functions
 * 2. Read through the API's documentation and understand what needs to be included in the params of the request,
 *    create a generic params object
 * 3. Register event listeners, fetch the data per the user's input
 * 4. Output results to the UI (success and error)
 * 5. Adjust UI states accordingly
 */


// * 1. Extract all selectors
const submitButton = document.querySelector('#submit');
const input = document.querySelector('#input');
const errorSpan = document.querySelector('#error');
const resultContainer = document.querySelector('#results');


// * 2. Read through the API's documentation and understand what needs to be included in the params of the request, create a generic params object
const API_ENDPOINT = 'https://en.wikipedia.org/w/api.php?';
const params = {
    action: 'query',
    format: 'json',
    //mores nastavit zarad apija
    origin: '*',
    //extracts inner HTML text
    prop: 'extracts',
    exchars: '250',
    exintro: true,
    explaintext: true,
    //perform a full text search
    generator: 'search',
    //How many total pages to return
    gsrlimit: 20

}

// * 1. create helper functions
const disableUI = () => {
    input.disabled = true;
    submitButton.disabled = true;
}

const enableUI = () => {
    input.disabled = false;
    submitButton.disabled = false;
}

const clearPreviousResult = () => {
    resultContainer.innerHTML = '';

    //ce je errror
    errorSpan.innerHTML = '';
}

const isInputEmpty = (input) => {
    if (!input || input === '') return true
    return false;
}

const showError = (error) => {
    errorSpan.innerHTML = `${error}`;
}

const showResults = (results) => {
    results.forEach(result => {
        resultContainer.innerHTML += `
        <div class="results__item">
            <a href="https://en.wikipedia.org/?curid=${result.pageId}" target="_blank" class="card animated bounceInUp">
                <h2 class="results__item__title">${result.title}</h2>
                <p class="results__item__intro">${result.intro}</p>
            </a>
        </div>
    `;
    });
};

const prepareData = pages => {
    const results = Object.values(pages).map(page => ({
        pageId: page.pageid,
        title: page.title,
        intro: page.extract,
    }));

    showResults(results);
};

const getSearchData = async () => {
    const userInput = input.value;
    if (isInputEmpty(userInput)) return;

    params.gsrsearch = userInput;

    disableUI();

    try {
        const { data } = await axios.get(API_ENDPOINT, { params });

        if (data.error) throw new Error(data.error.info);
        prepareData(data.query.pages);
    } catch (error) {
        showError(error);
    } finally {
        enableUI();
    }
};

//  * 3. Register event listeners, fetch the data per the user's input

const handleKeyEvent = (e) => {
    if(e.key === 'Enter') {
        getSearchData();
    }
}

const registerEventHandlers = () => {
        //typing for input, check samo za enter handleKeyEvent
    input.addEventListener('keydown', handleKeyEvent);

     //click on button
    submitButton.addEventListener('click', getSearchData);
};

//eventHandlere mors klicat 
registerEventHandlers();