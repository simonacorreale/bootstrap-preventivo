/* 
Assegno milestone 1 
- TO DO
Quello che devo eseguire in questo script:
1) Verifica validazione mail
2) Scelta tipo di lavoro
3) Verifica codice promozionale
4) Calcolo finale

Per la validazione codice:
1) Creare una lista di codici validi.
2) Verificare se il codice inserito è presente nella lista.
3) Applicare lo sconto del 20% se il codice è valido.
4) Segnalare se il codice non è valido.

Per il loader
1) Al click del bottone calcola preventivo compare un loader di qualche secondo
2) compare il risultato
*/

//#region___CALCOLO PREZZO PROFESSIONE___

// Array di codice inserito
const promoCode = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

// Funzione per calcolare il prezzo finale (test con sconto)
function finalCalc(finalWork, hours = 10, discount = false) {

    let workTime;

    switch (finalWork.toLowerCase()) {
        case 'backend':
            workTime = 20.50;
            break;
        case 'frontend':
            workTime = 15.30;
            break;
        case 'analisi':
            workTime = 33.60;
            break;
        default:
            workTime = 0;
    }

    let total = workTime * hours;

    if (discount) {
        total *= 0.8;
    }

    // Inserisco il risultato in forma umana
    const totalPrice = total.toFixed(2);
    const formattedPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
        totalPrice);

    /*  console.log(formattedPrice); */

    // Collego gli elementi html
    const resultInt = document.getElementById("result-int");
    const resultDec = document.getElementById("result-dec");
    const divisionNumber = formattedPrice.split(",");
    /*   console.log(divisionNumber); */

    // Cambio lo stile delgi elementi separandoli
    resultInt.textContent = divisionNumber[0];
    /*   console.log(resultInt); */
    resultDec.textContent = `,${divisionNumber[1]}`;
    /*  console.log(resultDec); */

};

/* console.log(finalCalc('backend', 10));
console.log(finalCalc('frontend', 10));
console.log(finalCalc('analisi', 10)); */

//#endregion___CALCOLO PREZZO PROFESSIONE___

//#region__ELEMENTI HTML___

// Collego gli elementi HTML 

const workTypeSelect = document.getElementById('work-type');
/* console.log(workTypeSelect); */
const resultParagraph = document.getElementById('result-int');
/* console.log(resultParagraph); */
const promoCodeInput = document.getElementById('promo-code');
/* console.log(promoCodeInput); */
const submitButton = document.getElementById('calc-button');
/* console.log(submitButton); */
const resultMessage = document.getElementById("results-message");

// spinner load
const spinnerEl = submitButton.querySelector('#spinner');
const statusSpan = submitButton.querySelector('.status');
const originalTextStatus = statusSpan.innerHTML;

//#endregion__ELEMENTI HTML___

//#region___FUNZIONE DI LOADING PER IL LOADER___
function loaderButton() {

    submitButton.disabled = true;
    spinnerEl.classList.remove('d-none');
    statusSpan.innerHTML = 'Loading...';

    setTimeout(() => {

        spinnerEl.classList.add('d-none');
        statusSpan.innerHTML = originalTextStatus;
        submitButton.disabled = false;
        resultMessage.classList.remove('d-none');

        console.log("loaderTimer");
    }, 1000);
}
//#endregion___FUNZIONE DI LOADING PER IL LOADER___

//#region___CLICK NEL BOTTONE___
submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Recupero dei valori inseriti
    const selectedWork = workTypeSelect.value;
    const enteredCode = promoCodeInput.value.trim().toUpperCase();

    const isValidCode = promoCode.includes(enteredCode);// Cambio valore true/false se incluso nell'array
    const emailInput = document.getElementById('valid-email');
    const emailValue = emailInput.value.trim();

    const regex = /^[a-zA-Z0-9.]+@gmail\.(com|it)$/;// ->https://regexr.com/<-

    const nameInput = document.getElementById('name-id');
    const surnameInput = document.getElementById('surname-id');
    const checkBox = document.getElementById('checkbox-id'); // Recupero la checkbox

    finalCalc(selectedWork, 10, isValidCode);

    let isNameValid = false;
    let isSurnameValid = false;
    let isCheckValid = false;
    let isMailValid = false;

    // Validazione nome
    if (nameInput.value.trim() === '') {
        nameInput.classList.add('is-invalid');

    } else {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
        isNameValid = true;
        console.log("nome corretta");
    }

    // Validazione cognome
    if (surnameInput.value.trim() === '') {
        surnameInput.classList.add('is-invalid');

    } else {
        surnameInput.classList.remove('is-invalid');
        surnameInput.classList.add('is-valid');
        isSurnameValid = true;
        /*  console.log("cognome corretta"); */

    }
    // Codice validazione
    if (enteredCode === '') {
        promoCodeInput.classList.remove('is-valid', 'is-invalid');

    } else if (isValidCode) {
        promoCodeInput.classList.add('is-valid');
        promoCodeInput.classList.remove('is-invalid');

    } else {
        promoCodeInput.classList.add('is-invalid');
        promoCodeInput.classList.remove('is-valid');

    }

    // Email validazione tramite regex
    if (regex.test(emailValue)) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        console.log("email corretta");
        isMailValid = true;

    } else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
    }

    if (!checkBox.checked) {
        checkBox.classList.add('is-invalid');

    } else {
        checkBox.classList.remove('is-invalid');
        checkBox.classList.add('is-valid');
        console.log("checkBox corretta");
        isCheckValid = true;
    }

    // Abilita il risultato se valido 
    console.log(isCheckValid);

    if (isNameValid && isSurnameValid && isCheckValid && isMailValid) {
        loaderButton();
    } else {
        resultMessage.classList.add('d-none');
        /* console.log("validazione errata"); */
    }
});
//#endregion___FUNZIONE DI CLICK NEL BOTTONE___

