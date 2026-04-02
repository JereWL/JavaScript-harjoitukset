'use strict';
const students = [
  {
    name: 'John',
    id: '2345768',
  },
  {
    name: 'Paul',
    id: '2134657',
  },
  {
    name: 'Jones',
    id: '5423679',
  },
];

for (let i = 0; i < students.length; i++) {
  const studentInfo = document.createElement("option");
  studentInfo.textContent = `${students[i].name} (${students[i].id})`;
  document.getElementById("target").appendChild(studentInfo);
}