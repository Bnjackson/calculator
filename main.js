const CLEAR_BTN = document.getElementById('clearBtn');
const DELETE_BTN = document.getElementById('deleteBtn');
const EQUALS_BTN = document.getElementById('equalsBtn');
const SIGN_BTN = document.getElementById('signBtn');
const DECIMAL_BTN = document.getElementById('decimalBtn');
const OPERANDS = document.querySelectorAll('.operand-btn');
const OPERATORS = document.querySelectorAll('.operator-btn');

let currentOperand = '0';
let lastOperand = '';
let currentOperator;

OPERANDS.forEach(operand => {
    operand.addEventListener('click', (event) => {
        console.log(event.target.innerHTML, event);
    });
});

OPERATORS.forEach(operator => {
    operator.addEventListener('click', (event) => {
        console.log(event.target.innerHTML, event);
    });
});

CLEAR_BTN.addEventListener('click', () => {
    clearCalculator();
});

DELETE_BTN.addEventListener('click', () => {
    deleteLastDigit();
});

EQUALS_BTN.addEventListener('click', () => {
    if(currentOperand, lastOperand, currentOperator) {
        operate(currentOperand, lastOperand, currentOperand); 
    }
});

SIGN_BTN.addEventListener('click', () => {
    if (currentOperand[0] === '-') {
        currentOperand = currentOperand.slice(1);
    } else {
        currentOperand = '-' + currentOperand;
    }
});

DECIMAL_BTN.addEventListener('click', () => {
    const regex = /\./;
    if (!regex.test(currentOperand) && currentOperand !== '0') {
        currentOperand += '.';
    }
});

function updateCurrentOperationScreen() {

}

function updateLastOperationScreen() {
    
}

function updateCurrentOperator() {

}

function operate(operand1, operand2, operator) {

}

function clearCalculator() {

}

function deleteLastDigit() {

}