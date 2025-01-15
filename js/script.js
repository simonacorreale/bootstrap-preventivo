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

calcButton.addEventListener('click', function (event) {
    event.preventDefault();

    const spinnerEl = submitButton.querySelector('#spinner')
    const statusSpan = submitButton.querySelector('.status');
    const originalTextStatus = statusSpan.innerHTML;
    // Status base del bottone
    submitButton.disabled = true;
    spinnerEl.classList.remove('d-none')
    statusSpan.innerHTML = 'Loading...'
    resultMessage.classList.add('d-none')

    // Recupero dei valori inseriti
    const selectedWork = workTypeSelect.value;
    const enteredCode = promoCodeInput.value.trim().toUpperCase();
    const isValidCode = promoCode.includes(enteredCode);
    const emailInput = document.getElementById('valid-email');
    const emailValue = emailInput.value.trim();
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.(com|it)$/;

    finalCalc(selectedWork, 10, isValidCode);

    // Codice validazione
    if (enteredCode === '') {
        promoCodeInput.classList.remove('is-valid', 'is-invalid');
    } else if (isValidCode) {
        promoCodeInput.classList.add('is-valid');
        promoCodeInput.classList.remove('is-invalid');
        validFeedback.textContent = 'Codice promo valido'
    } else {
        promoCodeInput.classList.add('is-invalid');
        promoCodeInput.classList.remove('is-valid');
        invalidFeedback.textContent = 'Codice non valido';
    }

    // Email validazione tramite regex
    if (regex.test(emailValue)) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        validFeedbackMail.textContent = 'Mail corretta';
    } else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        invalidFeedbackMail.textContent = 'Il formato della mail non è corretto o la mail non è inserita';
    }

    // Simulazione del caricamento (1 secondo)
    setTimeout(() => {
        spinnerEl.classList.add('d-none');           // Nasconde lo spinner
        statusSpan.innerHTML = originalTextStatus;   // Ripristina il testo del bottone
        submitButton.disabled = false;              // Riabilita il bottone
        console.log("Loader completato");
        resultMessage.classList.remove('d-none')
    }, 1000);
});
