const mines = [
  {
    name: "copper",
    title: "Медь",
    price: 0,
    level: 0,
    increase: 1,
    upgradePrice: 10,
    upgradeIncrease: 1
  },
  {
    name: "silver",
    title: "Серебро",
    price: 200,
    level: 0,
    increase: 50,
    upgradePrice: 50,
    upgradeIncrease: 50
  },
  {
    name: "gold",
    title: "Золото",
    price: 1000,
    level: 0,
    increase: 500,
    upgradePrice: 500,
    upgradeIncrease: 500
  }
];
let game = {
  coins: 0
};

// Init game state.
createMines();
updateUI();

const sec = 1000; // 1000
myTimer = setInterval(endOfTurnCalc, sec);

function endOfTurnCalc() {
  game.coins += Number.parseInt(
    mines.reduce((sum, mine) => (sum += mine.level > 0 ? mine.increase : 0), 0)
  );
  updateUI();
}

function updateUI() {
  document.getElementById("gold").innerText = game.coins;
  for (const mine of mines) {
    updateMineUI(mine.name);
  }
}

function createMines() {
  const drawer = document.getElementById("drawer");
  for (const mine of mines) {
    const div = document.createElement("div");
    div.className = "column";
    div.id = `${mine.name}Mine`;
    div.innerHTML = `
        <h1>${mine.title}</h1>
        Уровень <span id="${mine.name}Level">${mine.level}</span><br/>
        Прирост <span id="${mine.name}Increase">${
      mine.increase
    }</span><span class="coin"></span>/s<br />
        <button id="${mine.name}BuyBtn" class="btn ${
      mine.price <= game.coins ? "btnBuy" : "btnDis"
    }">
      Купить за ${mine.price}<span class="coin"></span>
      </button>
    </div>`;
    drawer.appendChild(div);
    const button = document.querySelector(`#${mine.name}BuyBtn`);
    button.addEventListener("click", function() {
      buyMine(mine.name);
    });
  }
}

function buyMine(name) {
  const mine = mines.filter(mine => mine.name === name)[0];
  if (mine.price <= game.coins) {
    game.coins -= mine.price;
    mine.level = 1;

    const button = document.getElementById(`${mine.name}BuyBtn`);
    button.style.display = "none";

    const newButton = document.createElement("button");
    newButton.id = `${mine.name}UpgBtn`;
    newButton.className = mine.upgradePrice <= game.coins ? "btnUpg" : "btnDis";
    newButton.innerHTML = `Улучшить за 
        <span id="${mine.name}UpgPrice">${mine.upgradePrice}</span>
        <span class="coin"></span></span>`;
    newButton.addEventListener("click", function(e) {
      upgradeMine(mine.name);
    });

    button.parentNode.appendChild(newButton);
  }
}

function updateMineUI(name) {
  const mine = mines.filter(mine => mine.name === name)[0];
  const drawer = document.getElementById("drawer");
  if (mine.level > 0) {
    document.getElementById(`${mine.name}Level`).innerText = mine.level;
    document.getElementById(`${mine.name}Increase`).innerText = mine.increase;
    document.getElementById(`${mine.name}UpgBtn`).className = `btn ${
      mine.upgradePrice <= game.coins ? "btnUpg" : "btnDis"
    }`;
    document.getElementById(`${mine.name}UpgPrice`).innerText =
      mine.upgradePrice;
  } else {
    document.getElementById(`${mine.name}BuyBtn`).className = `btn ${
      mine.price <= game.coins ? "btnBuy" : "btnDis"
    }`;
  }
}

function upgradeMine(name) {
  const mine = mines.filter(mine => mine.name === name)[0];
  if (mine) {
    if (mine.upgradePrice <= game.coins) {
      game.coins -= mine.upgradePrice;
      mine.level += 1;
      mine.upgradePrice *= mine.level;
      mine.increase += mine.upgradeIncrease;
    }
  }
}
