class Calculator {
  constructor() {
    this.leftOperand = '';
    this.rightOperand = '';
    this.operator = '';
  }

  digitClick(button) {
    if (button.target.className === 'number') {
      if (this.operator === '') {
        this.leftOperand += button.target.value.toString();
      } else {
        this.rightOperand += button.target.value.toString();
      }
    }
    this.showResult();
  }

  chooseOperation(button) {
    if (this.operator !== '' && this.rightOperand !== '') this.performCalculation();
    if (button.target.className === `operands`) {
      this.operator = button.target.value;
      console.log(`Operator is ${this.operator}`);
    }
    this.showResult();
  }

  performCalculation() {
    console.log(`Operator is ${this.operator}`);
    let result = '';
    if (this.leftOperand === '') {
      this.leftOperand = 0;
    }
    switch (this.operator) {
      case `/`:
        if (this.rightOperand === 0) {
          throw Error (`Can't divide by 0`);
        } else {
          result = (Number(this.leftOperand) / Number(this.rightOperand)).toFixed(2);
        }
        break;
      case `*`:
        result = Number(this.leftOperand) * Number(this.rightOperand);
        break;
      case `+`:
        result = Number(this.leftOperand) + Number(this.rightOperand);
        break;
      case `-`:
        if (this.leftOperand === '') {
          result = 0 - Number(this.rightOperand);
        } else {
          result = Number(this.leftOperand) - Number(this.rightOperand);
        }
        break;
    }
    this.leftOperand = result.toString();
    this.rightOperand = '';
    this.operator = '';
  }

   addDot() {
    if (this.operator === '') {
      this.leftOperand += `.`;
    } else {
      this.rightOperand += `.`;
    }
   }

  showResult() {
    if (this.operator === '') {
      document.getElementById('calculationResult').innerText = this.leftOperand;
      document.getElementById('operations').innerText = `${this.leftOperand}`;
    } else {
      document.getElementById('calculationResult').innerText = this.rightOperand;
      document.getElementById('operations').innerText = `${this.leftOperand} ${this.operator} ${this.rightOperand}`;
    }
  }

  resetCalculator() {
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
});