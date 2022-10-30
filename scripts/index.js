const userDetailContainer = document.querySelector('.user-details');
const addUserBtn = document.querySelector('.add-user');
const doubleMoneyBtn = document.querySelector('.double-money');
const onlyMillionairesBtn = document.querySelector('.only-millionaires');
const sortRichestBtn = document.querySelector('.sort-richest');
const entireWealthBtn = document.querySelector('.entire-wealth');

let data = [];

// fetch random user and their wealth
async function getRandomUser() {
  const jsonResponse = await fetch('https://randomuser.me/api');
  const data = await jsonResponse.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10000000),
  };

  addData(newUser);
}

function addData(user) {
  data.push(user);
  console.log(data);

  updateDOM();
}

function addUserDetail(userDetail) {
  const mainContainer = document.createElement('div');
  const nameContainer = document.createElement('p');
  const wealthContainer = document.createElement('p');

  nameContainer.textContent = userDetail.name;
  wealthContainer.textContent = `\$ ${userDetail.money
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  mainContainer.classList.add('align-items');

  mainContainer.appendChild(nameContainer);
  mainContainer.appendChild(wealthContainer);

  return mainContainer;
}

function updateDOM(providedData = data) {
  // clear the main div
  userDetailContainer.innerHTML = ``;

  // take the provided data, and loop through
  providedData.forEach((user) => {
    // call the function which adds the content and returns the reference
    // take that reference and addAdjacentChild to userDetailContainer
    const eachUser = addUserDetail(user);
    userDetailContainer.appendChild(eachUser);
  });
}

function doubleMoney() {
  userDetailContainer.innerHTML = ``;

  data = data.map((userDetail) => ({
    name: userDetail.name,
    money: userDetail.money * 2,
  }));

  updateDOM();
}

function sortUsers() {
  data.sort((firstEl, secondEl) => secondEl.money - firstEl.money);
  updateDOM();
}

function filterMillionaires() {
  let filteredData = data.filter((user) => user.money > 1000000);
  data = [...filteredData];
  updateDOM();
}

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth:  <strong>$ ${wealth
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}/-</strong></h3>`;

  userDetailContainer.appendChild(wealthEl);
}

doubleMoneyBtn.addEventListener('click', doubleMoney);
addUserBtn.addEventListener('click', getRandomUser);
sortRichestBtn.addEventListener('click', sortUsers);
onlyMillionairesBtn.addEventListener('click', filterMillionaires);
entireWealthBtn.addEventListener('click', calculateWealth);

(() => {
  getRandomUser();
  getRandomUser();
  getRandomUser();
  getRandomUser();
})();
