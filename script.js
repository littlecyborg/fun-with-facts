// Sample facts
let facts = [
    {
        id: 1,
        fact: "Honey never spoils.",
        image: "assets/images/honey.jpg",
        video: "assets/videos/honey.mp4",
        topic: "Nature",
        date: "2025-02-10",
        likes: 0,
        dislikes: 0
    },
    {
        id: 2,
        fact: "Bananas are berries, but strawberries are not.",
        image: "assets/images/banana.jpg",
        video: "assets/videos/banana.mp4",
        topic: "Food",
        date: "2025-02-11",
        likes: 0,
        dislikes: 0
    },
    // Add 100 more facts...
];

// Display facts
function displayFacts(factsArray) {
    const factListDiv = document.getElementById('fact-list');
    factListDiv.innerHTML = ''; // Clear existing facts

    factsArray.forEach(fact => {
        const factItem = document.createElement('div');
        factItem.className = 'fact-item';

        factItem.innerHTML = `
            <h3>${fact.fact}</h3>
            <img src="${fact.image}" alt="Fact Image">
            <video controls src="${fact.video}"></video>
            <div class="thumbs">
                <button onclick="thumbsUp(${fact.id})">👍</button>
                <span id="likes-${fact.id}">${fact.likes}</span>
                <button onclick="thumbsDown(${fact.id})">👎</button>
                <span id="dislikes-${fact.id}">${fact.dislikes}</span>
            </div>
        `;

        factListDiv.appendChild(factItem);
    });
}

// Like/Dislike functionality
function thumbsUp(id) {
    facts[id - 1].likes += 1;
    document.getElementById(`likes-${id}`).textContent = facts[id - 1].likes;
}

function thumbsDown(id) {
    facts[id - 1].dislikes += 1;
    document.getElementById(`dislikes-${id}`).textContent = facts[id - 1].dislikes;
}

// Search functionality
function searchFacts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredFacts = facts.filter(fact => fact.fact.toLowerCase().includes(query));
    displayFacts(filteredFacts);
}

// Sort facts by Newest, Oldest, or Topic
function sortBy(criteria) {
    let sortedFacts = [...facts];
    if (criteria === 'newest') {
        sortedFacts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (criteria === 'oldest') {
        sortedFacts.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (criteria === 'topic') {
        sortedFacts.sort((a, b) => a.topic.localeCompare(b.topic));
    }
    displayFacts(sortedFacts);
}

// Load Fun Fact of the Day (can be randomized or specific)
function loadFunFactOfTheDay() {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    const factOfTheDayDiv = document.getElementById('fact-of-the-day');
    factOfTheDayDiv.innerHTML = `
        <h3>${randomFact.fact}</h3>
        <img src="${randomFact.image}" alt="Fact Image">
        <video controls src="${randomFact.video}"></video>
    `;
}

// Initial display
loadFunFactOfTheDay();
displayFacts(facts);
