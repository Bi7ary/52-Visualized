const ranks = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
const suits = ["clubs", "diamonds", "hearts", "spades"];
let lastMessageIndex = -1;
let deck = [];

for (let suit of suits) {
  for (let rank of ranks) {
    deck.push(`${rank}_of_${suit}`);
  }
}

let count = 1;
const max = factorial(52n);

function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= n; i++) {
    result *= i;
  }
  return result;
}

function renderDeck(deckArray) {
  const container = document.getElementById("deck");
  container.innerHTML = "";

  deckArray.forEach((card, index) => {
    const img = document.createElement("img");
    img.src = `./Cards/${card}.png`;
    img.alt = card;

    container.appendChild(img);
  });

  document.getElementById("counter").innerText = `${count.toLocaleString()} of ${max.toLocaleString()}`;
}

function nextPermutation(array) {
  let i = array.length - 2;
  while (i >= 0 && array[i] >= array[i + 1]) i--;
  if (i < 0) return false;

  let j = array.length - 1;
  while (array[j] <= array[i]) j--;

  [array[i], array[j]] = [array[j], array[i]];

  let left = i + 1;
  let right = array.length - 1;
  while (left < right) {
    [array[left], array[right]] = [array[right], array[left]];
    left++;
    right--;
  }
  return true;
}

function next() {
  const hasNext = nextPermutation(deck);
  if (!hasNext) {
    showToast("🎉 Congratulations! You've reached the final permutation.");
    return;
  }

  count++;
  renderDeck(deck);

  if (count % 50 === 0) {
    showMilestoneMessage();
  }
}


renderDeck(deck);
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}
function showMilestoneMessage() {
  const percent = ((count / Number(max)) * 100).toFixed(20);

  const messages = [
    `You're making progress! ${count.toLocaleString()} of ${max.toLocaleString()}.`,
    `You're ${percent}% done (yep, basically 0%) 🤓`,
    `Most likely, no one has ever seen this exact shuffle before.`,
    `Still ${max - BigInt(count)} permutations to go. Easy! 😅`,
    `Fun fact: Shuffling cards is basically bending reality.`,
    `Another 50 shuffles! You're on fire 🔥`,
    `Don't stop now! There's only ${max} total... no pressure.`,
    `Your patience is legally admirable.`,
    `This deck is getting more unique with every shuffle.`,
    `If you're still clicking, you're a legend 🏆`,
    `Maybe... just maybe... this is THE shuffle.`,
    `The odds of this shuffle? Astronomically unique.`,
    `Feeling lucky? Keep going 🍀`,
    `52 cards... infinite ambition.`,
    `NASA called. They want your shuffle for science. 🧪`,
    `You’ve clicked more times than most people ever will here.`,
    `We should’ve added a cookie for this progress 🍪`,
    `Every 50 shuffles, the deck gets wiser. You too.`,
    `You're crafting history, one shuffle at a time.`,
    `This is what digital discipline looks like. Respect.`,
  ];

  let index;
  do {
    index = Math.floor(Math.random() * messages.length);
  } while (index === lastMessageIndex); 
  lastMessageIndex = index;
  showToast(messages[index]);
}


