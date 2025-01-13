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
3)Applicare lo sconto del 20% se il codice è valido.

- Done
1) Calcolo e risultato funzionante
- To fix
1) Sistemare allineamenti e paragrafo elementi e provare ad applicare il loader nel bottone
2) Validazione codice sconto partendo dall' array che ho definito
*/

const promoCode = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

// Funzione per calcolare il prezzo finale (test)

function finalCalc(finalWork, hours = 10) {

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

    return (workTime * hours).toFixed(2) + '€';
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


// risultato 10 ore fisse
calcButton.addEventListener('click', function (event) {
    event.preventDefault();

    const selectedWork = workTypeSelect.value;
    const result = finalCalc(selectedWork);
    resultParagraph.textContent = `EUR: ${result}`;
});

