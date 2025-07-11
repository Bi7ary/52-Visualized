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
    img.src = `Cards/${card}.png`;
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
    `You're ${percent}% done (yep, basically 0%) 🤓`,
    `Most likely, no one has ever seen this exact shuffle before.`,
    `Still ${max - BigInt(count)} permutations to go. Easy! 😅`,
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
    `52! equals ${max.toLocaleString()} — that's more than the number of atoms on Earth 🌍`,
  `If you shuffled 1 deck per second, nonstop, it would take over 31 million years to see them all.`,
  `Most shuffled decks have *never* existed before — you're making history.`,
  `The number 52! is 8.07 × 10^67 — imagine that.`,
  `You’ve seen ${count.toLocaleString()} unique arrangements. That’s a microscopic dent in the universe.`,
  `A full shuffle of 52 cards has more outcomes than stars in the known galaxy.`,
  `Every time you click, you're entering a parallel universe of card order.`,
  `Just 10 cards have 3.6 million permutations. 52? You can't even write it down fully.`,
  `If every human on Earth shuffled a deck every second, for a billion years, you'd still not cover them all.`,
  `You're deeper into the permutations than 99.999999% of all humans ever.`,
  `Only a few people will ever see the permutations you're seeing now.`,
  `Statistically, this exact card order has likely never existed in history.`,
  `Congratulations, you're exploring the most complex simple thing in math.`,
  `Still curious? Keep clicking. The universe of shuffles is endless.`,
  `This isn't just cards — it's mathematics, randomness, and imagination.`,
  `Feeling small yet? Good. Math does that.`,
  `You've clicked ${count.toLocaleString()} times — you're part of a rare experiment.`,
  `Think about this: you're navigating a factorial jungle.`,
  `Numbers like this break human intuition. And you're staring right at one.`,
  `Keep going. You're shuffling through the multiverse.`
  ];

  let index;
  do {
    index = Math.floor(Math.random() * messages.length);
  } while (index === lastMessageIndex); 
  lastMessageIndex = index;
  showToast(messages[index]);
}


