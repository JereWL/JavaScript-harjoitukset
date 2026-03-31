function even(numbers) {
    const evenNumbers = numbers.filter(function(number) {
        return number % 2 === 0;
    });
    return evenNumbers;
}

const numbers = [1, 4, 5, 8, 9, 12];
const evenNumbers = even(numbers);

console.log("Original array:", numbers);
console.log("Even numbers:", evenNumbers);