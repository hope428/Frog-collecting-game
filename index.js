const jsConfetti = new JSConfetti({});

const button = document.querySelector("button");
const gameTitle = document.getElementById("game-objective");
const attempts = document.getElementById("attempts");
const collection = document.querySelector(".collection");
const playAgainbtn = document.getElementById("reset");
const startingFrogId = Math.ceil(Math.random() * 4);
let attemptCount = 0;
let frogs = [
  {
    id: 1,
    imgSrc: `img/frog${startingFrogId}.jpg`,
    isHeld: false,
  },

  {
    id: 2,
    imgSrc: `img/frog${startingFrogId}.jpg`,
    isHeld: false,
  },

  {
    id: 3,
    imgSrc: `img/frog${startingFrogId}.jpg`,
    isHeld: false,
  },

  {
    id: 4,
    imgSrc: `img/frog${startingFrogId}.jpg`,
    isHeld: false,
  },
];

function resetGame() {
  gameTitle.textContent = "Collect all 4 frogs!";
  attemptCount = 0;
  activeGame = true;
  attempts.innerText = `Attempts ${attemptCount}/5`;
  for (let i = 0; i < frogs.length; i++) {
    frogs[i].isHeld = false;
    frogs[i].imgSrc = `img/frog${startingFrogId}.jpg`;
  }
  button.disabled = false;
  playAgainbtn.classList.add("hidden");
  renderFrogs();
}

function endGame() {
  button.disabled = true;
  playAgainbtn.classList.remove("hidden");
  gameTitle.textContent = "You win!";
  jsConfetti.addConfetti({
    emojis: ["🐸", "🔥", "💚", "🤠", "🌸"],
    confettiNumber: 200,
  });
}

function checkWin() {
  let win = false;
  const imgSrcArray = frogs.map((frog) => frog.imgSrc);
  const sortedArray = imgSrcArray.sort();
  if (
    sortedArray[0] === sortedArray[1] ||
    sortedArray[1] === sortedArray[2] ||
    sortedArray[2] === sortedArray[3] ||
    sortedArray[3] === sortedArray[4]
  ) {
    win = false;
  } else {
    win = true
  }
  if (win) {
    endGame();
  }
}

function addClickHandlerToImg(element, currentFrog) {
  element.onclick = () => {
    holdFrog(currentFrog, element);
  };
}

function holdFrog(frog, element) {
  if (!frog.isHeld) {
    frog.isHeld = true;
    element.classList.add("held-frog");
  } else {
    frog.isHeld = false;
    element.classList.remove("held-frog");
  }
}

function renderFrogs() {
  collection.innerHTML = "";
  for (frog of frogs) {
    const frogImg = document.createElement("img");
    addClickHandlerToImg(frogImg, frog);
    frogImg.src = frog.imgSrc;
    frogImg.classList.add("frog-figure");
    if (frog.isHeld) {
      frogImg.classList.add("held-frog");
    }
    collection.appendChild(frogImg);
  }
}

function handleClick() {
  attemptCount++;
  attempts.innerText = `Attempts ${attemptCount}/5`;
  if (attemptCount <= 4) {
    for (frog of frogs) {
      if (!frog.isHeld) {
        frog.imgSrc = `img/frog${Math.ceil(Math.random() * 4)}.jpg`;
      }
    }

    renderFrogs();
    checkWin();
  } else {
    button.disabled = true;
    playAgainbtn.classList.remove("hidden");
  }
}

playAgainbtn.addEventListener("click", resetGame);
button.addEventListener("click", handleClick);
renderFrogs();
