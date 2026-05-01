const scenarios = [
  {
    title: "Autocomplete Suggestions",
    prompt: "You need to quickly find all words that start with a typed prefix from a dictionary of 100k terms.",
    options: ["Trie", "Stack", "Hash Set", "Linked List"],
    answer: "Trie",
    explanation: "A trie is optimized for prefix lookups, making autocomplete fast and scalable."
  },
  {
    title: "Undo in a Text Editor",
    prompt: "Each edit should be reversible in reverse order, one at a time.",
    options: ["Queue", "Stack", "Graph", "Binary Search Tree"],
    answer: "Stack",
    explanation: "Undo follows LIFO behavior, which is exactly what a stack provides."
  },
  {
    title: "Shortest Route Between Cities",
    prompt: "Your app models cities and roads and wants to compute shortest paths.",
    options: ["Array", "Graph", "Deque", "Heap"],
    answer: "Graph",
    explanation: "Cities and roads are naturally nodes and edges, so graph algorithms fit best."
  },
  {
    title: "Task Scheduling by Priority",
    prompt: "Tasks must always be processed from highest priority to lowest.",
    options: ["Priority Queue", "Queue", "Hash Map", "Trie"],
    answer: "Priority Queue",
    explanation: "A priority queue efficiently keeps highest-priority items ready to pop first."
  }
];

let currentIndex = 0;
let voteCounts = [];

const roundLabel = document.getElementById("round-label");
const scenarioTitle = document.getElementById("scenario-title");
const scenarioText = document.getElementById("scenario-text");
const optionsForm = document.getElementById("options-form");
const voteList = document.getElementById("vote-list");
const answerText = document.getElementById("answer-text");
const nextBtn = document.getElementById("next-btn");
const revealBtn = document.getElementById("reveal-btn");
const resetVotesBtn = document.getElementById("reset-votes-btn");

function renderScenario() {
  const scenario = scenarios[currentIndex];
  voteCounts = scenario.options.map(() => 0);

  roundLabel.textContent = `Round ${currentIndex + 1} of ${scenarios.length}`;
  scenarioTitle.textContent = scenario.title;
  scenarioText.textContent = scenario.prompt;
  answerText.classList.add("hidden");
  answerText.textContent = "";

  optionsForm.innerHTML = "";

  scenario.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.value = String(index);

    label.append(radio, document.createTextNode(option));
    optionsForm.appendChild(label);
  });

  renderVotes();
}

function renderVotes() {
  const scenario = scenarios[currentIndex];
  voteList.innerHTML = "";

  scenario.options.forEach((option, idx) => {
    const li = document.createElement("li");
    li.textContent = `${option}: ${voteCounts[idx]} vote${voteCounts[idx] === 1 ? "" : "s"}`;
    voteList.appendChild(li);
  });
}

optionsForm.addEventListener("change", (event) => {
  const selected = Number(event.target.value);
  if (Number.isNaN(selected)) {
    return;
  }

  voteCounts[selected] += 1;
  event.target.checked = false;
  renderVotes();
});

revealBtn.addEventListener("click", () => {
  const scenario = scenarios[currentIndex];
  answerText.textContent = `Best answer: ${scenario.answer}. ${scenario.explanation}`;
  answerText.classList.remove("hidden");
});

resetVotesBtn.addEventListener("click", () => {
  voteCounts = voteCounts.map(() => 0);
  renderVotes();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % scenarios.length;
  renderScenario();
});

renderScenario();
