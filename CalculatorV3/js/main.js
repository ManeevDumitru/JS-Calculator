class Calculator {
  constructor() {
    this.numbers = ['', ''];
    this.count = 0;
    this.operationClicked = false;
    this.operationValue = '';
    this.result = '';
    this.keyboardInUse = false;
    this.number = document.querySelectorAll('.number');
    this.operation = document.querySelectorAll('.operands');
  }

  addNumber() {
    this.number.forEach(number => {
      number.addEventListener('click', () => {
        this.numbers[this.count] += number.innerHTML;
        this.printNumber();
      });
    });
  }

  buttonAdd() {
    document.addEventListener('keydown', (number) => {
      this.keyboardInUse = true;
      if (number.key > -1 && number.key <= 9) {
        this.numbers[this.count] += Number(number.key);
        this.printNumber();
      }
      console.log(this.numbers);
    });
  }

  operationAdd() {
    document.addEventListener('keydown',  (number) => {
      if (number.key === "+" ||
      number.key === "-" ||
      number.key === "*" ||
      number.key === "/") {
        this.chooseOperation();
      }
      switch (number.key) {
        case "+":
          this.operationValue = "+";
          break;
        case "-":
          this.operationValue = "-";
          break;
        case "*":
          this.operationValue = "x";
          break;
        case "/":
          this.operationValue = "/";
          break;
        case "Backspace":
          this.resetCalculator();
          break;
        case ".":
          this.addDot();
          break;
      }
      if (number.key === `Enter`){
        this.performCalculation();
      }
      this.printNumber();
    });
  }

  chooseOperation() {
    console.log('choose');
    if (this.keyboardInUse === false) {
      this.operation.forEach(operation => {
        operation.addEventListener('click', () => {
          this.operationValue = operation.innerHTML;
          this.count++;
          this.printNumber();
          document.getElementById('block').style.display = 'block';
          document.getElementById('blockNumbers').style.display = 'none';
        });
      });
      console.log(this.count);
    } else {
      this.count++;
      this.printNumber();
      document.getElementById('block').style.display = 'block';
      document.getElementById('blockNumbers').style.display = 'none';
    }
    this.operationClicked = true;
  }

  addDot() {
    if (this.numbers[this.count].includes('.')) {
      throw Error(`There is a dot in this number already, can't add more`);
    } else {
      this.numbers[this.count] = this.numbers[this.count].toString() + '.';
    }
    this.printNumber();
  }

  resetCalculator() {
    console.log('backspace');
    this.count = 0;
    this.numbers = ['', ''];
    this.operationClicked = false;
    this.stopVid();
    document.getElementById('operations').innerHTML = '';
    document.getElementById('calculationResult').innerHTML = '';
    document.getElementById('block').style.display = 'none';
    document.getElementById('blockNumbers').style.display = 'none';
  }

  playVid() {
    const vid = document.getElementById('video');
    vid.style.opacity = '1';
    vid.play();
    vid.volume = .3;
  }

  stopVid() {
    const vid = document.getElementById('video');
    vid.style.opacity = '0';
    vid.currentTime = 0;
    vid.pause();
  }

  performCalculation() {
    if (this.number[0] === '') {
      this.numbers[0] = 0;
    }
    switch (this.operationValue) {
      case "-":
        this.result = Number(this.numbers[0]) - Number(this.numbers[1]);
        break;
      case "+":
        this.result = Number(this.numbers[0]) + Number(this.numbers[1]);
        break;
      case `x`:
        this.result = Number(this.numbers[0]) * Number(this.numbers[1]);
        break;
      case `/`:
        console.log(this.numbers === 0);
        if (this.numbers[1] !== 0) {
          this.result = Number(this.numbers[0]) / Number(this.numbers[1]);
        } else {
          this.playVid();
        }
        break;
      default:
        throw Error(`Looks like you did some wrong, gj`);
    }
    if (this.result === Infinity || this.result === -Infinity) {
      this.playVid();
      document.getElementById('block').style.display = 'block';
      document.getElementById('blockNumbers').style.display = 'block';
    } else {
      document.getElementById('blockNumbers').style.display = 'block';
      document.getElementById('block').style.display = 'none';
      this.numbers[0] = this.result;
      this.numbers[1] = '';
    }
    this.operationClicked = false;
    this.keyboardInUse = false;
    this.count = 0;
    this.printNumber();
    console.log(`${this.numbers[0]}\n${this.numbers[1]}`);
  }

  printNumber() {
    console.log(this.operationClicked);
    const calculationResult = document.getElementById('calculationResult');
    const operations = document.getElementById('operations');
    calculationResult.innerHTML = this.numbers[this.count];
    if (this.operationClicked) {
      operations.innerHTML = this.numbers[0] + ' ' + this.operationValue + ' ' + this.numbers[1];
    } else {
      operations.innerHTML = ``;
    }
  }

}

document.addEventListener("DOMContentLoaded", () => {
  let calculator = new Calculator();
  calculator.addNumber();
  document.getElementById(`sumUp`).addEventListener('click', () => {
    calculator.performCalculation();
  });
  calculator.chooseOperation();
  document.getElementById('clear').addEventListener('click', () => {
    calculator.resetCalculator();
  });
  document.getElementById('dotOperand').addEventListener('click', () => {
    calculator.addDot();
  });
  calculator.buttonAdd();
  calculator.operationAdd();
});































