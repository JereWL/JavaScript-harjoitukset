function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

const list = document.getElementById("write");
let result = 0;

const diceSidesInput = prompt("How many sides does the dice have?");
const diceSides = Number(diceSidesInput);

if (!Number.isInteger(diceSides) || diceSides < 2) {
    alert("Please enter an integer of 2 or higher.");
} else {
    while (result !== diceSides) {
        result = rollDice(diceSides);
        const item = document.createElement("li");
        item.textContent = result;
        list.appendChild(item);
    }
}
