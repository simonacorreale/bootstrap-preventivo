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
3) il bottone diventa grigio fino a che non si modifica nuovamente il form
*/

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

    console.log(formattedPrice);

    // Collego gli elementi html
    const resultInt = document.getElementById("result-int");
    const resultDec = document.getElementById("result-dec");
    const divisionNumber = formattedPrice.split(",");
    console.log(divisionNumber);

    // Cambio lo stile delgi elementi separandoli
    resultInt.textContent = divisionNumber[0];
    console.log(resultInt);
    resultDec.textContent = `,${divisionNumber[1]}`;
    console.log(resultDec);

};

console.log(finalCalc('backend', 10));
console.log(finalCalc('frontend', 10));
console.log(finalCalc('analisi', 10));

// Collego gli elementi HTML 

const workTypeSelect = document.getElementById('work-type');
console.log(workTypeSelect);

const calcButton = document.getElementById('calc-button');
console.log(calcButton);

const resultParagraph = document.getElementById('result-int');
console.log(resultParagraph);

const validFeedback = document.getElementById('valid-feedback');
console.log(validFeedback);

const invalidFeedback = document.getElementById('invalid-feedback');
console.log(invalidFeedback);

const promoCodeInput = document.getElementById('promo-code');
console.log(promoCodeInput);

const validFeedbackMail = document.getElementById('valid-feedback-mail');
console.log(validFeedbackMail);

const invalidFeedbackMail = document.getElementById('invalid-feedback-mail');
console.log(invalidFeedbackMail);

const submitButton = document.querySelector('#calc-button');
console.log(submitButton);

const resultMessage = document.getElementById("results-message")

const checBox = document.getElementById('required-check');


calcButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Recupero dei valori inseriti
    const selectedWork = workTypeSelect.value;

    const enteredCode = promoCodeInput.value.trim().toUpperCase();

    const isValidCode = promoCode.includes(enteredCode);

    const emailInput = document.getElementById('valid-email');

    const emailValue = emailInput.value.trim();
    console.log(emailValue);

    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.(com|it)$/;

    const nameInput = document.getElementById('name-id');
    console.log(nameInput);

    const surnameInput = document.getElementById('surname-id');
    console.log(surnameInput);

    const checkBox = document.getElementById('checkbox-id'); // Recupero la checkbox
    const checkBoxFeedback = document.getElementById('checkbox-feedback'); //  Div per feedback checkbox

    finalCalc(selectedWork, 10, isValidCode);

    let isValid = true;

    // Validazione nome
    if (nameInput.value.trim() === '') {
        nameInput.classList.add('is-invalid');
        isValid = false;
    } else {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
    }

    // Validazione cognome
    if (surnameInput.value.trim() === '') {
        surnameInput.classList.add('is-invalid');
        isValid = false;
    } else {
        surnameInput.classList.remove('is-invalid');
        surnameInput.classList.add('is-valid');
    }

    // Codice validazione
    if (enteredCode === '') {
        promoCodeInput.classList.remove('is-valid', 'is-invalid');
        resultMessage.classList.remove('d-none');
    } else if (isValidCode) {
        promoCodeInput.classList.add('is-valid');
        promoCodeInput.classList.remove('is-invalid');
        validFeedback.textContent = 'Codice promo valido'
        resultMessage.classList.remove('d-none');
    } else {
        promoCodeInput.classList.add('is-invalid');
        promoCodeInput.classList.remove('is-valid');
        invalidFeedback.textContent = 'Codice non valido';
        resultMessage.classList.add('d-none');
    }


    // Email validazione tramite regex
    if (regex.test(emailValue)) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        validFeedbackMail.textContent = 'Mail corretta';

        // Abilita il risultato se valido 
        calcButton.disabled = false;
    } else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        invalidFeedbackMail.textContent = 'Il formato della mail non è corretto o la mail non è inserita';
    }



    // check su mail nome e cognome
    if (emailValue && nameInput.value.trim() && surnameInput.value.trim() && checBox()) {
        resultMessage.classList.remove('d-none');

    } else {
        resultMessage.classList.add('d-none');
    }


    if (!checkBox.checked) {
        checkBox.classList.add('is-invalid');
        checkBoxFeedback.textContent = 'Devi accettare i termini e le condizioni.';
        isValid = false;
    } else {
        checkBox.classList.remove('is-invalid');
        checkBox.classList.add('is-valid');
        checkBoxFeedback.textContent = '';
    }


});


