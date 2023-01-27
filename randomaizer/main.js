function generateNumber() {
    let minNumber = document.querySelector(".min").value;
    let maxNumber = document.querySelector(".max").value;
    let amountNumber = document.querySelector(".amount").value;
    let uniqueCheckNumber = document.querySelector(".unique-numbers");
    let randomResult = document.querySelector(".result");
    let result = [];

    let random;

    if ((amountNumber > (maxNumber + minNumber)) && (amountNumber > 100)) return;

    while (result.length < Math.trunc(amountNumber)) {
        if (uniqueCheckNumber.checked) {
            random = generateInteger(minNumber, maxNumber);
            if (!result.includes(random)) {
                result.push(random);
            }
        } else {
            result.push(generateInteger(minNumber, maxNumber));
        }
    }

    randomResult.innerHTML = result.join(', ');
    return result;
}

function generateInteger(min, max) {
    let minNumber = Math.ceil(min);
    let maxNumber = Math.floor(max);

    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}