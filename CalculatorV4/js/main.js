class Calculator {
  constructor() {
    this.operands = ['', ''];
    this.operator = '';
  }

  digitClick(button) {
    if (button.target.className === 'number') {
      if (this.operator === '') {
        this.operands[0] += button.target.value.toString();
      } else {
        this.operands[1] += button.target.value.toString();
      }
    }
    this.showResult();
  }

  chooseOperation(button) {
    console.log(this.operands);
    if (this.operator !== '' && this.operands[1] !== '') this.performCalculation();
    if (button.target.className === `operands`) {
      this.operator = button.target.value;
      console.log(`Operator is ${this.operator}`);
    }
    this.showResult();
  }

  performCalculation() {
    console.log(`Operator is ${this.operator}`);
    let leftOperand = this.operands[0];
    let rightOperand = this.operands[1];
    let result = '';
    switch (this.operator) {
      case `/`:
        if (this.operands[1] !== 0) {
          throw Error (`Can't divide by 0`);
        } else {
          result = Number(leftOperand) / Number(rightOperand);
        }
        break;
      case `*`:
        result = Number(leftOperand) * Number(rightOperand);
        break;
      case `+`:
        result = Number(leftOperand) + Number(rightOperand);
        break;
      case `-`:
        if (leftOperand === '') {
          result = 0 - Number(rightOperand);
        } else {
          result = Number(leftOperand) - Number(rightOperand);
        }
        break;
    }
    this.operands[0] = result.toString();
    this.operands[1] = '';
    this.operator = '';
  }

   addDot() {
    if (this.operator === '') {
      this.operands[0] += `.`;
    } else {
      this.operands[1] += `.`;
    }
   }

  showResult() {
    if (this.operator === '') {
      document.getElementById('calculationResult').innerText = this.operands[0];
      document.getElementById('operations').innerText = `${this.operands[0]}`;
    } else {
      document.getElementById('calculationResult').innerText = this.operands[1];
      document.getElementById('operations').innerText = `${this.operands[0]} ${this.operator} ${this.operands[1]}`;
    }
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
});