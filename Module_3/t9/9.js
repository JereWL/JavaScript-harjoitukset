const syntaxInput = document.getElementById("calculation");
const calculateButton = document.getElementById("start");
const resultElement = document.getElementById("result");

calculateButton.addEventListener("click", () => {
    const syntax = syntaxInput.value.trim();
    let number1, number2, result;

    if (syntax.includes("+")) {
        [number1, number2] = syntax.split("+").map(Number);
        result = number1 + number2;

    } else if (syntax.includes("-")) {
        [number1, number2] = syntax.split("-").map(Number);
        result = number1 - number2;

    } else if (syntax.includes("*")) {
        [number1, number2] = syntax.split("*").map(Number);
        result = number1 * number2;

    } else if (syntax.includes("/")) {
        [number1, number2] = syntax.split("/").map(Number);

        if (number2 === 0) {
            resultElement.textContent = "Cannot divide by zero.";
            return;
        }

        result = number1 / number2;

    } else {
        resultElement.textContent = "Invalid input.";
        return;
    }

    resultElement.textContent = `Result: ${result}`;
});
