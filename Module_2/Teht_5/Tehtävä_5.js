const numbers = [];

for (let i = 0;; i++) {
    let number = prompt("Enter a number:");
    if (numbers.includes(Number(number))) {
        alert("Number already entered. Stopping input.");
        break;
    }
    numbers.push(Number(number));
}

numbers.sort(function(a, b) {
    return a - b;
});
console.log("Numbers in the list:", numbers);