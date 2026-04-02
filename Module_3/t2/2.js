const target = document.getElementById("target");

const firstItem = document.createElement("li");
firstItem.textContent = "First item";

const secondItem = document.createElement("li");
secondItem.textContent = "Second item";
secondItem.classList.add("my-item");

const thirdItem = document.createElement("li");
thirdItem.textContent = "Third item";

target.appendChild(firstItem);
target.appendChild(secondItem);
target.appendChild(thirdItem);
