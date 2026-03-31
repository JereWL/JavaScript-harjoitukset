const list = [];

for (let i = 0; ; i++) {
    let number = prompt("Enter a number (or 0 to stop):");
    if (number === "0") {
        break;
    }
    list.push(Number(number));
}
list.sort(function(a, b) {
    return b - a;
});
console.log("Numbers in the list:", list);