const dogs = [];

for (let i = 0; i < 6; i++) {
    let dogName = prompt("Enter a dog's name:");
    dogs.push(dogName);
}

dogs.sort();
dogs.reverse();

const target = document.querySelector("#target");
for (let i = 0; i < dogs.length; i++) {
    const item = document.createElement("li");
    item.textContent = dogs[i];
    target.appendChild(item);
}