let input = document.querySelector(".input");
let result = document.querySelector(".result");
let deleteBtn = document.querySelector("#delete");
let keys = document.querySelectorAll(".bottom button");

let operators = ["+", "-", "x", "÷"];

let operation = "";
let answer;
let decimalAdded = false;

function keyPress(e) {
    let key = e.target.dataset.key;
    let lastChar = operation[operation.length - 1];

    if (key === "=") {
        return;
    }

    if (key === "." && decimalAdded) {
        return;
    }

    if (operators.indexOf(key) !== -1) {
        decimalAdded = false;
    }

    if (operation.length === 0 && key === "-") {
        operation += key;
        input.innerHTML = operation;
        return;
    }

    if (operation.length === 0 && operators.indexOf(key) !== -1) {
        input.innerHTML = operation;
        return;
    }

    if (operators.indexOf(lastChar) !== -1 && operators.indexOf(key) !== -1) {
        operation = operation.replace(/.$/, key);
        input.innerHTML = operation;
        return;
    }

    if (key) {
        if (key === ".") decimalAdded = true;
        operation += key;
        input.innerHTML = operation;
        return;
    }
}

function evaluate(e) {
    let key = e.target.dataset.key;
    let lastChar = operation[operation.length - 1];

    if (key === "=" && operators.indexOf(lastChar) !== -1) {
        operation = operation.slice(0, -1);
    }

    if (operation.length === 0) {
        answer = "";
        result.innerHTML = answer;
        return;
    }

    if (operation[0] === "0" && operation[1] !== "." && operation.length > 1) {
        operation = operation.slice(1);
    }

    let final = operation.replace(/x/g, "*").replace(/÷/g, "/");
    answer = +(eval(final)).toFixed(5);

    if (key === "=") {
        decimalAdded = false;
        operation = `${answer}`;
        answer = "";
        input.innerHTML = operation;
        result.innerHTML = answer;
        return;
    }
    
    result.innerHTML = answer;
}

let clearInput = (e) => {    
    operation = "";
    input.innerHTML = operation;
}

deleteBtn.addEventListener("click", clearInput);

keys.forEach(key => {
    key.addEventListener("click", keyPress);
    key.addEventListener("click", evaluate);
});
