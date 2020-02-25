class Calculator {
  constructor() {
    this.leftOperand = '';
    this.rightOperand = '';
    this.operator = '';
    this.keyboardOperatorChosen = false;
  }

  digitClick(button) { // Get value by clicking in HTML buttons and puts it into current number
    if (button.target.className === 'number') {
      if (this.operator === '') {
        this.leftOperand += button.target.value.toString();
      } else {
        this.rightOperand += button.target.value.toString();
      }
    }
  }

  chooseOperation(button) { // Depending on what button you click sets the operator to this button value
    if (this.operator !== '' && this.rightOperand !== '') this.performCalculation();
    if (button.target.className === `operands`) {
      this.operator = button.target.value;
      console.log(`Operator is ${this.operator}`);
    }
  }

  performCalculation() { // Performs calculations
    let result = ' ';
    switch (this.operator) {
      case `/`:
        if (this.rightOperand !== `0`) {
          result = (Number(this.leftOperand) / Number(this.rightOperand)).toFixed(2);
        } else {
          throw Error(`Can't divide by 0`);
        }
        break;
      case `*`:
        if (this.rightOperand !== "" && this.leftOperand !== `.`) {
          result = Number(this.leftOperand) * Number(this.rightOperand);
        } else {
          throw Error(`EROR 404`);
        }
        break;
      case `+`:
        result = Number(this.leftOperand) + Number(this.rightOperand);
        break;
      case `-`:
        result = Number(this.leftOperand) - Number(this.rightOperand);
        break;
    }
    console.log(`${this.leftOperand}\n${this.rightOperand}`);
    this.leftOperand = result.toString();
    this.rightOperand = '';
    this.operator = '';
    this.keyboardOperatorChosen = false;
  }

  addDot() { // Adds dot to current number
    if (this.operator === '') {
      if (!this.leftOperand.includes(`.`) && this.leftOperand.length > 0) {
        this.leftOperand += `.`;
      }
    } else {
      if (!this.rightOperand.includes(`.`) && this.rightOperand.length > 0) {
        this.rightOperand += `.`;
      }
    }
  }

  showResult() { // Show's result
    if (this.operator === '') {
      document.getElementById('calculationResult').innerText = this.leftOperand;
      document.getElementById('operations').innerText = `${this.leftOperand}`;
    } else {
      document.getElementById('calculationResult').innerText = this.rightOperand;
      document.getElementById('operations').innerText = `${this.leftOperand} ${this.operator} ${this.rightOperand}`;
    }
  }

  /* WORK IN PROGRESS */  /* WORK IN PROGRESS */  /* WORK IN PROGRESS */  /* WORK IN PROGRESS */

  keyboardInputDigits(keyboardButton) { // Write the number using the keyboard
    if (this.operator === '') {
      this.leftOperand += keyboardButton.key;
    } else {
      this.rightOperand += keyboardButton.key;
    }
  }

  keyboardChooseOperation(keyboardButton) {// Choose the operation using the keyboard
    if (this.keyboardOperatorChosen === true && (this.rightOperand !== '' && this.rightOperand !== '0')) {
      this.performCalculation();
      this.keyboardOperatorChosen = false;
    } else {
      switch (keyboardButton.key) {
        case "+":
          this.operator = "+";
          break;
        case "-":
          this.operator = "-";
          break;
        case "/":
          this.operator = "/";
          break;
        case "*":
          this.operator = "*";
          break;
      }
      this.keyboardOperatorChosen = true;
      this.showResult();
    }
  }

  resetCalculator() { // Resets the calculator
    this.leftOperand = '';
    this.rightOperand = '';
    this.operator = '';
    this.keyboardOperatorChosen = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let calculator = new Calculator();
  document.getElementById(`buttonsLeft`).addEventListener('click', (button) => {
    calculator.digitClick(button);
    calculator.showResult();
  });
  document.getElementById('buttonsMiddle').addEventListener('click', (button) => {
    calculator.chooseOperation(button);
    calculator.showResult();
  });
  document.getElementById('sumUp').addEventListener('click', () => {
    calculator.performCalculation();
    calculator.showResult();
  });
  document.getElementById('dotButton').addEventListener(`click`, () => {
    calculator.addDot();
    calculator.showResult();
  });
  document.getElementById(`clear`).addEventListener('click', () => {
    calculator.resetCalculator();
    calculator.showResult();
  });
  document.addEventListener('keydown', (keyboardButton) => {
    if (keyboardButton.key > -1 && keyboardButton.key <= 9) {
      calculator.keyboardInputDigits(keyboardButton);
      calculator.showResult();
    }
    if (keyboardButton.key === "+" || keyboardButton.key === "-" || keyboardButton.key === "*" ||
      keyboardButton.key === "/") {
      calculator.keyboardChooseOperation(keyboardButton);
      calculator.showResult();
    }
    if (keyboardButton.key === "Enter") {
      calculator.performCalculation();
      calculator.showResult();
    }
    if (keyboardButton.key === "Backspace") {
      calculator.resetCalculator();
      calculator.showResult();
    }
  });
});