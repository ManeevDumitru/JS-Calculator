let numbers = [""];
let count = 0;
let operation = 0;
let result = 0;
let inProgress = 0;

const test = function() {
    let oldValue;
    oldValue = document.getElementById(this.id).value;
    numbers[count] += "" + oldValue;
    if (inProgress === 0) {
      document.getElementById('operations').innerText = numbers[count];
    }
    document.getElementById('calculationResult').innerText = numbers[count];
    console.log(`${numbers}`)
};

const operationC = function() {
  inProgress++;
  numbers[count + 1] = '';
  if (numbers[count] !== '') {
    count++;
    console.log(`${numbers}\n${numbers.length}`);
    document.getElementById('block').style.display = 'block';
    document.getElementById('calculationResult').innerText = numbers[count];
  }
};

const operationDivide = function() {
  operationC();
  document.getElementById('operations').innerText = `${numbers[count - 1]} / `;
  operation = 1;
};

const operationMultiply = function() {
  operationC();
  document.getElementById('operations').innerText = `${numbers[count - 1]} * `;
  operation = 2;
};

const operationMinus = function () {
  operationC();
  document.getElementById('operations').innerText = `${numbers[count - 1]} - `;
  operation = 3;
};

const operationPlus = function () {
  operationC();
  document.getElementById('operations').innerText = `${numbers[count - 1]} + `;
  operation = 4;
};

const equal = function() {
  switch (operation) {
    case 1: {
      result = (Number(numbers[0]) / Number(numbers[1])).toFixed(5);
      document.getElementById('operations').innerText = `${numbers[count - 1]} / ${numbers[count]}`;
    } break;
    case 2: {
      result = Number(numbers[0]) * Number(numbers[1]);
      document.getElementById('operations').innerText = `${numbers[count - 1]} * ${numbers[count]}`;
    } break;
    case 3: {
      result = Number(numbers[0]) - Number(numbers[1]);
      document.getElementById('operations').innerText = `${numbers[count - 1]} - ${numbers[count]}`;
    } break;
    case 4: {
      result = Number(numbers[0]) + Number(numbers[1]);
      document.getElementById('operations').innerText = `${numbers[count - 1]} + ${numbers[count]}`;
    } break;
  }

  document.getElementById('calculationResult').innerText = `${result}`;
  console.log(result);
  document.getElementById('block').style.display = 'none';
  numbers[0] = result;
  count = 0;
  inProgress--;
};

const clear = function() {
  document.getElementById('operations').innerText = ``;
  document.getElementById('calculationResult').innerText = ``;
  numbers = [""];
  count = 0;
  inProgress = 0;
};

// document.getElementById('1').onclick = test;
document.getElementById('1').addEventListener('click', test);
document.getElementById('2').addEventListener('click', test);
document.getElementById('3').addEventListener('click', test);
document.getElementById('4').addEventListener('click', test);
document.getElementById('5').addEventListener('click', test);
document.getElementById('6').addEventListener('click', test);
document.getElementById('7').addEventListener('click', test);
document.getElementById('8').addEventListener('click', test);
document.getElementById('9').addEventListener('click', test);
document.getElementById('0').addEventListener('click', test);
document.getElementById('divide').addEventListener('click', operationDivide);
document.getElementById('multiply').addEventListener('click', operationMultiply);
document.getElementById('minus').addEventListener('click', operationMinus);
document.getElementById('plus').addEventListener('click', operationPlus);
document.getElementById('equal').addEventListener('click', equal);
document.getElementById('clear').addEventListener('click', clear);


































