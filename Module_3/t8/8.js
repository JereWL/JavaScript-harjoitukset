const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateButton = document.getElementById('start');
const resultElement = document.getElementById('result');

calculateButton.addEventListener('click', () => {
	const num1 = Number(num1Input.value);
	const num2 = Number(num2Input.value);
	const operation = operationSelect.value;

	if (Number.isNaN(num1) || Number.isNaN(num2)) {
		resultElement.textContent = 'Please enter valid numbers.';
		return;
	}

	let result;

	if (operation === 'add') {
		result = num1 + num2;
	} else if (operation === 'sub') {
		result = num1 - num2;
	} else if (operation === 'multi') {
		result = num1 * num2;
	} else if (operation === 'div') {
		if (num2 === 0) {
			resultElement.textContent = 'Cannot divide by zero.';
			return;
		}
		result = num1 / num2;
	}

	resultElement.textContent = `Result: ${result}`;
});
