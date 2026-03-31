function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

const list = document.getElementById("write");
let result = 0;

while (result !== 6) {
    result = rollDice();
    const item = document.createElement("li");
    item.textContent = result;
    list.appendChild(item);
}
