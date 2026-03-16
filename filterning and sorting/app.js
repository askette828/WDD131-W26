const hikes = [
  {
    name: "Bechler Falls",
    description: "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    distance: 3,
    difficulty: 2
  },
  {
    name: "Coffee Pot Rapids",
    description: "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    tags: ["Rafting"],
    distance: 11,
    difficulty: 1
  },
  {
    name: "Denanda Falls",
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    distance: 7,
    difficulty: 3
  },
  {
    name: "Union Falls",
    description: "A forest hike to one of the largest waterfalls in Yellowstone backcountry.",
    tags: ["Waterfall", "Camping", "Yellowstone"],
    distance: 16,
    difficulty: 4
  },
  {
    name: "Fairy Falls",
    description: "Popular trail to a tall waterfall with a side trip to Grand Prismatic overlook.",
    tags: ["Waterfall", "Family", "Yellowstone"],
    distance: 5,
    difficulty: 2
  }
];

const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsEl = document.getElementById("results");

function renderDifficulty(level) {
  const max = 5;
  const boots = "🥾".repeat(level);
  const placeholders = "▫".repeat(max - level);
  return `${boots} ${placeholders}`.trim();
}

function renderHikes(hikeList) {
  if (!hikeList.length) {
    resultsEl.innerHTML = '<p class="empty">No hikes matched your search.</p>';
    return;
  }

  const cards = hikeList.map((hike) => {
    const tags = hike.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

    return `
      <article class="card">
        <h2>${hike.name}</h2>
        <div class="tags">${tags}</div>
        <p class="description">${hike.description}</p>
        <p class="difficulty">Difficulty: ${renderDifficulty(hike.difficulty)}</p>
      </article>
    `;
  });

  resultsEl.innerHTML = cards.join("");
}

function filterHikes(searchText) {
  const query = searchText.trim().toLowerCase();

  if (!query) {
    return [...hikes].sort((a, b) => a.distance - b.distance);
  }

  return hikes
    .filter((hike) => {
      const inName = hike.name.toLowerCase().includes(query);
      const inDescription = hike.description.toLowerCase().includes(query);
      const inTags = hike.tags.some((tag) => tag.toLowerCase().includes(query));
      return inName || inDescription || inTags;
    })
    .sort((a, b) => a.distance - b.distance);
}

function showRandomInitialHike() {
  const randomIndex = Math.floor(Math.random() * hikes.length);
  renderHikes([hikes[randomIndex]]);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const filtered = filterHikes(searchInput.value);
  renderHikes(filtered);
});

showRandomInitialHike();
