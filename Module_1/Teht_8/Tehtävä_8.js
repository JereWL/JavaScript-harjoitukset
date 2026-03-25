const startYear = Number(prompt('Enter start year:'));
const endYear = Number(prompt('Enter end year:'));

const fromYear = Math.min(startYear, endYear);
const toYear = Math.max(startYear, endYear);

const resultList = document.querySelector('#result-list');

for (let year = fromYear; year <= toYear; year++) {
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  if (isLeapYear) {
    const listItem = document.createElement('li');
    listItem.textContent = year;
    resultList.appendChild(listItem);
  }
}
