class Calculator {
  constructor() {
    this.leftOperand = '';
    this.rightOperand = '';
    this.operator = '';
  }

  digitClick(button) { // Get value by clicking in HTML buttons and puts it into current number
    if (button.target.className === 'number') {
      if (this.operator === '') {
        this.leftOperand += button.target.value.toString();
      } else {
        this.rightOperand += button.target.value.toString();
      }
    }
    this.showResult();
  }

  chooseOperation(button) { // Depending on what button you click sets the operator to this button value
    if (this.operator !== '' && this.rightOperand !== '') this.performCalculation();
    if (button.target.className === `operands`) {
      this.operator = button.target.value;
      console.log(`Operator is ${this.operator}`);
    }
    this.showResult();
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
          throw Error (`EROR 404`);
        }
        break;
      case `+`:
        result = Number(this.leftOperand) + Number(this.rightOperand);
        break;
      case `-`:
        result = Number(this.leftOperand) - Number(this.rightOperand);
        break;
    }
    this.leftOperand = result.toString();
    this.rightOperand = '';
    this.operator = '';
    this.showResult();
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
      this.leftOperand += keyboardButton.key.toString();
    } else {
      this.rightOperand += keyboardButton.key.toString();
    }
    this.showResult();
  }

  keyboardChooseOperation(keyboardButton) { // Choose the operation using the keyboard
      switch (keyboardButton.key) {
        case "/":
          this.operator = `/`;
          break;
        case "*":
          this.operator = `*`;
          break;
        case "-":
          this.operator = `-`;
          break;
        case "+":
          this.operator = `+`;
          break;
    }
    this.showResult();
  }

  keyboardChooseMethod(keyboardButton) { // Perform the calculations using keyboard
    switch (keyboardButton.key) {
      case (keyboardButton.key === "+" &&
        keyboardButton.key === "-" &&
        keyboardButton.key === "*" &&
        keyboardButton.key === "/"):
        this.keyboardChooseOperation(keyboardButton);
        break;
      case "Enter":
        this.performCalculation();
        break;
      case ".":
        this.addDot();
        break;
      case "Backspace":
        this.resetCalculator();
        break;
    }
    this.showResult();
  }

  resetCalculator() { // Resets the calculator
    this.leftOperand = '';
    this.rightOperand = '';
    this.operator = '';
    this.showResult();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let calculator = new Calculator();
  document.getElementById(`buttonsLeft`).addEventListener('click', (button) => {
    calculator.digitClick(button);
  });
  document.getElementById('buttonsMiddle').addEventListener('click', (button) => {
    calculator.chooseOperation(button);
  });
  document.getElementById('sumUp').addEventListener('click', () => {
    calculator.performCalculation();
  });
  document.getElementById('dotButton').addEventListener(`click`, () => {
    calculator.addDot();
  });
  document.getElementById(`clear`).addEventListener('click', () => {
    calculator.resetCalculator();
  });
  document.addEventListener('keydown', (keyboardButton) => {
    if (keyboardButton.key > -1 && keyboardButton.key <= 9) {
      calculator.keyboardInputDigits(keyboardButton);
    }
    calculator.keyboardChooseOperation(keyboardButton);
    calculator.keyboardChooseMethod(keyboardButton);
  });
});