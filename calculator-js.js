// script.js
document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = null;
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                operator = null;
                previousInput = '';
                display.textContent = '0';
                return;
            }

            if (value === '=') {
                if (operator && previousInput !== '' && currentInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    operator = null;
                    previousInput = '';
                }
                return;
            }

            if (this.classList.contains('operator')) {
                if (currentInput === '' && value === '-') {
                    currentInput = '-';
                    display.textContent = currentInput;
                    return;
                }
                if (currentInput !== '') {
                    if (operator) {
                        previousInput = calculate(previousInput, currentInput, operator);
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = '';
                    operator = value;
                }
                return;
            }

            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            display.textContent = currentInput;
        });
    });

    function calculate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                if (b === 0) {
                    alert('Cannot divide by zero');
                    return '0';
                }
                return (a / b).toString();
            default:
                return '0';
        }
    }
});
