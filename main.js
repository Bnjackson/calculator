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
        if (currentOperand === '0') {
            currentOperand = event.target.innerHTML;
        } else {
            currentOperand += event.target.innerHTML;
        }
        updateCurrentOperationScreen();
    });
});

OPERATORS.forEach(operator => {
    operator.addEventListener('click', (event) => {
        if (currentOperand !== '0' && lastOperand && currentOperator) {
            operate(currentOperand, lastOperand, currentOperand);
            currentOperator = event.target.innerHTML;
        } else {
            currentOperator = event.target.innerHTML;
            lastOperand = currentOperand;
            currentOperand = '0';
            updateLastOperationScreen();
        }
    });
});

CLEAR_BTN.addEventListener('click', () => {
    clearCalculator();
});

DELETE_BTN.addEventListener('click', () => {
    deleteLastDigit();
});

EQUALS_BTN.addEventListener('click', () => {
    if(currentOperand !== '0' && lastOperand && currentOperator) {
        operate(currentOperand, lastOperand, currentOperator); 
    }
});

SIGN_BTN.addEventListener('click', () => {
    // Sign button not working as intended I tried to use the directionality mark, but was messing up operations. So sing appears on the right side instead of left.
    if (currentOperand[0] !== '-' && currentOperand !== '0') {
        currentOperand = '-' + currentOperand;
    } else if (currentOperand !== '0') {
        currentOperand = currentOperand.slice(1);
    }
    updateCurrentOperationScreen();
});

DECIMAL_BTN.addEventListener('click', () => {
    const regex = /\./;
    if (!regex.test(currentOperand) && currentOperand !== '0') {
        currentOperand += '.';
    }
    updateCurrentOperationScreen();
});

function updateCurrentOperationScreen() {
    const currentOperationScreen = document.getElementById('currentOperationScreen');
    currentOperationScreen.innerHTML = currentOperand;
}

function updateLastOperationScreen() {
    const lastOperationScreen = document.getElementById('lastOperationScreen');
    if (currentOperand === '0') {
        lastOperationScreen.innerHTML =  `${currentOperator} `;
        lastOperationScreen.innerHTML += lastOperand;
    } else {
        console.log('Update screen running');
        lastOperationScreen.innerHTML = '= ';
        lastOperationScreen.innerHTML += `${currentOperand} `;
        lastOperationScreen.innerHTML += `${currentOperator} `;
        lastOperationScreen.innerHTML += `${lastOperand }`;
    }
    // Was causing a bug when I tried to concatenate the strings together. So have to do separately.
}


function operate(operand1, operand2, operator) {
    let result = '';
    if (operator === '÷') {
        result = Number(operand2) / Number(operand1);
    } else if (operator === '*') {
        result = Number(operand2) * Number(operand1);
    } else if (operator === '-') {
        result = Number(operand2) - Number(operand1);
    } else if (operator === '+') {
        result = Number(operand2) + Number(operand1);
    }
    console.log(typeof result);
    updateLastOperationScreen();
    currentOperand = result.toString();
    lastOperand = '';
    updateCurrentOperationScreen();
}

function clearCalculator() {
    const currentOperationScreen = document.getElementById('currentOperationScreen');
    const lastOperationScreen = document.getElementById('lastOperationScreen');
    currentOperand = '0';
    lastOperand = '';
    currentOperator = '';
    currentOperationScreen.innerHTML = currentOperand;
    lastOperationScreen.innerHTML = '';
}

function deleteLastDigit() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, currentOperand.length - 1);
    }
    updateCurrentOperationScreen()
}