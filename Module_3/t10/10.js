const form = document.getElementById("source");
const firstNameInput = document.querySelector('[name="firstname"]');
const lastNameInput = document.querySelector('[name="lastname"]');
const resultElement = document.getElementById("target");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    if (firstName === "" || lastName === "") {
        resultElement.textContent = "Please enter both first and last names.";
        return;
    }

    resultElement.textContent = `Your name is ${firstName} ${lastName}`;
});