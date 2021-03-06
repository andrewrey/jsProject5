// DOM elements
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user adn add money
async function getRandomUser() {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000) + 1,
  };
  addData(newUser);
}

// Add Data to data array
function addData(newUser) {
  data.push(newUser);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string //

function formatMoney(number) {
  return `$` + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, `$&,`);
}

// Double User's money
function doubleTheirMoney() {
  console.log(data);
  data = data.map((item) => {
    return {
      ...item,
      money: item.money * 2,
    };
  });
  console.log(data);
  updateDOM();
}

// sort users by the richest
function sortRichest() {
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
}

// filter non-millionairs out
function filterMillionaires() {
  data = data.filter((item) => item.money >= 1000000);
  updateDOM();
}

// Total user's Wealth
function totalWealth() {
  let totalWealth = data.reduce((acc, curr) => {
    return acc + curr.money;
  }, 0);
  let newElement = document.createElement("div");
  newElement.innerHTML = `<h3>Total Amount: <strong>${formatMoney(totalWealth)}</strong></h3>`;
  main.appendChild(newElement);
}

// Event Listeners //
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleTheirMoney);
sortBtn.addEventListener("click", sortRichest);
showMillionairesBtn.addEventListener("click", filterMillionaires);
calculateWealthBtn.addEventListener("click", totalWealth);
