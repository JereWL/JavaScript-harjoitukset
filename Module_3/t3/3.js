'use strict';
const names = ['John', 'Paul', 'Jones'];

for (let i = 0; i < names.length; i++) {
    const namelist = document.createElement("li");
    namelist.textContent = names[i];
    document.getElementById("target").appendChild(namelist);
}