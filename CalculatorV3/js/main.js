class Calculator {
  constructor() {
    this.numbers = ['', ''];
    this.count = 0;
    this.operationClicked = false;
    this.operationValue = '';
    this.result = '';
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

  chooseOperation() {
    this.operation.forEach(operation => {
      operation.addEventListener('click', () => {
        this.operationValue = operation.innerHTML;
        this.operationClicked = true;
        this.count++;
        this.printNumber();
        document.getElementById('block').style.display = 'block';
        document.getElementById('blockNumbers').style.display = 'none';
      });
    });
    console.log(`operands`);
  }

  addDot() {
    document.getElementById('dotOperand').addEventListener('click', () => {
      if (this.numbers[this.count].includes('.')) {
        throw Error (`There is a dot in this number already, can't add more`);
      } else {
        this.numbers[this.count] = this.numbers[this.count].toString() + '.';
      }
    });
    this.printNumber();
  }

  performCalculation() {
    document.getElementById(`sumUp`).addEventListener('click', () => {
      switch (this.operationValue) {
        case "-":
          if (this.numbers[0] === '') {
            this.numbers[0] = 0;
          }
          this.result = Number(this.numbers[0]) - Number(this.numbers[1]);
          break;
        case "+":
          this.result = Number(this.numbers[0]) + Number(this.numbers[1]);
          break;
        case `x`:
          this.result = Number(this.numbers[0]) * Number(this.numbers[1]);
          break;
        case `/`:
          this.result = Number(this.numbers[0]) / Number(this.numbers[1]);
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
      this.count = 0;
      this.printNumber();
      console.log(`${this.numbers[0]}\n${this.numbers[1]}`);
    });
  }

  printNumber() {
    const calculationResult = document.getElementById('calculationResult');
    const operations = document.getElementById('operations');
    calculationResult.innerHTML = this.numbers[this.count];
    if (this.operationClicked) {
      operations.innerHTML = this.numbers[0] + ' ' + this.operationValue + ' ' + this.numbers[1];
    }
  }

  resetCalculator() {
    document.getElementById('clear').addEventListener('click', () => {
      this.count = 0;
      this.numbers = ['', ''];
      this.operationClicked = false;
      this.stopVid();
      document.getElementById('operations').innerHTML = '';
      document.getElementById('calculationResult').innerHTML = '';
      document.getElementById('block').style.display = 'none';
      document.getElementById('blockNumbers').style.display = 'none';
    });
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

}

document.addEventListener("DOMContentLoaded", () => {
  let calculator = new Calculator();
  calculator.addNumber();
  calculator.chooseOperation();
  calculator.performCalculation();
  calculator.resetCalculator();
  calculator.addDot();
});

/*const number = document.querySelectorAll('.number');
number.forEach(number => {
  number.addEventListener('click', () => {
    console.log(number.innerHTML);
  });
});
console.log(number);*/






























