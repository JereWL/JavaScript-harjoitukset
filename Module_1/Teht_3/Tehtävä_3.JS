const num1 = prompt("Give first digit here:");
const num2 = prompt("Give second digit here:");
const num3 = prompt("Give third digit here:");
const sumofnumbers = parseInt(num1) + parseInt(num2) + parseInt(num3);
const productofnumbers = parseInt(num1) * parseInt(num2) * parseInt(num3);
const averageofnumbers = sumofnumbers / 3;

document.querySelector('#sum').textContent = 'Sum: ' + sumofnumbers;
document.querySelector('#product').textContent = 'Product: ' + productofnumbers;
document.querySelector('#average').textContent = 'Average: ' + averageofnumbers;