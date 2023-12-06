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
        operate(currentOperand, lastOperand, currentOperand); 
    }
});

SIGN_BTN.addEventListener('click', () => {
    // Direction: rtl; causes - to appear left to right, so have to use the unicode character 'LEFT-TO-RIGHT MARK' to force a left to right direction for the -
    if (currentOperand.startsWith('\u200E-') || currentOperand.startsWith('-')) {
        currentOperand = currentOperand.slice(2);
        // Have to use slice(2) to remove directionality mark. Otherwise would not be removed
    } else if (currentOperand !== '0') {
        currentOperand = '\u200E-' + currentOperand;
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
        lastOperationScreen.innerHTML = '= ';
        lastOperationScreen.innerHTML = `${currentOperand} `;
        lastOperationScreen.innerHTML = `${currentOperator} `;
        lastOperationScreen.innerHTML += `${lastOperand }`;
    }
    // Was causing a bug when I tried to concatenate the strings together. So have to do separately.
}


function operate(operand1, operand2, operator) {

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