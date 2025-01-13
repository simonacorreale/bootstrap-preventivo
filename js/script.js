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
5) 
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
    }

    let total = workTime * hours;

    if (discount) {
        total *= 0.8;
    }
    return total.toFixed(2) + '€';
}

console.log(finalCalc('backend', 10));
console.log(finalCalc('frontend', 10));
console.log(finalCalc('analisi', 10));


// Collego gli elementi HTML 
const workTypeSelect = document.getElementById('work-type');
console.log(workTypeSelect);

const calcButton = document.getElementById('calc-button');
console.log(calcButton);

const resultParagraph = document.getElementById('result');
console.log(resultParagraph);

const resultParagraphLabel = document.getElementById('paragraph-label');
console.log(resultParagraphLabel);

const promoCodeInput = document.getElementById('promo-code');
console.log(promoCodeInput);


// risultato 10 ore fisse + check sul buono elementi html 
calcButton.addEventListener('click', function (event) {
    event.preventDefault();

    const selectedWork = workTypeSelect.value;
    const enteredCode = promoCodeInput.value.trim().toUpperCase();
    const isValidCode = promoCode.includes(enteredCode);

    const result = finalCalc(selectedWork, 10, isValidCode);

    resultParagraph.textContent = `EUR: ${result}`;

    if (enteredCode === '') {
        promoCodeInput.classList.remove('is-valid', 'is-invalid');
        resultParagraphLabel.textContent = 'nessun buono';
    } else if (isValidCode) {
        promoCodeInput.classList.add('is-valid');
        promoCodeInput.classList.remove('is-invalid');
        resultParagraphLabel.textContent = 'promo code valid';
    } else {
        promoCodeInput.classList.add('is-invalid');
        promoCodeInput.classList.remove('is-valid');
        resultParagraphLabel.textContent = 'promo code not valid';
    }
});