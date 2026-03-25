const number = Number(prompt("Give a number here:"));

if (number <= 1) {
    document.querySelector('#result').textContent = number + ' is not a prime number.';
} else if (number === 2) {
    document.querySelector('#result').textContent = number + ' is a prime number.';
} else if (number % 2 === 0) {
    document.querySelector('#result').textContent = number + ' is not a prime number.';
} else {
    let isPrime = true;
    for (let i = 3; i <= Math.sqrt(number); i += 2) {
        if (number % i === 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) {
        document.querySelector('#result').textContent = number + ' is a prime number.';
    } else {
        document.querySelector('#result').textContent = number + ' is not a prime number.';
    }
}