const diceAmount = Number(prompt('Enter the number of dice:'));
const targetSum = Number(prompt('Enter the target sum of eyes:'));

const simulations = 10000;
let successCount = 0;

for (let sim = 0; sim < simulations; sim++) {
    let currentSum = 0;
    
    for (let die = 0; die < diceAmount; die++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        currentSum += roll;
    }
    
    if (currentSum === targetSum) {
        successCount++;
    }
}

const probability = (successCount / simulations) * 100;

document.querySelector('#result').textContent = 
    'Probability to get sum ' + targetSum + ' with ' + diceAmount + ' dice is ' + probability.toFixed(2) + '%';
