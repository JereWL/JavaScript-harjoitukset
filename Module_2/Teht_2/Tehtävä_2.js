const participants = [];
const participantamount = prompt("How many participants are there?");
for (let i = 0; i < participantamount; i++) {
    let name = prompt("Enter participant's name:");
    participants.push(name);
}

participants.sort();

const target = document.querySelector("#target");
for (let i = 0; i < participants.length; i++) {
    const item = document.createElement("li");
    item.textContent = participants[i];
    target.appendChild(item);
}