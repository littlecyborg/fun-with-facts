// Sample data for demonstration
const facts = [
    {
        id: 1,
        title: "Did you know that honey never spoils?",
        content: "Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
        image: "assets/images/honey.jpg",
        video: "assets/videos/honey.mp4"
    },
    {
        id: 2,
        title: "Math Fact: The number Pi is infinite.",
        content: "Pi (π) is an irrational number, meaning it has an infinite number of decimal places that never repeat.",
        image: "assets/images/pi.jpg",
        video: "assets/videos/pi.mp4"
    }
    // More facts can be added here
];

function loadFacts() {
    const factsList = document.getElementById('facts-list');
    facts.forEach(fact => {
        const factDiv = document.createElement('div');
        factDiv.classList.add('fact-item');
        factDiv.innerHTML = `
            <h3>${fact.title}</h3>
            <p>${fact.content}</p>
            <img src="${fact.image}" alt="${fact.title}">
            <p><a href="factDetails.html?id=${fact.id}">Read more...</a></p>
        `;
        factsList.appendChild(factDiv);
    });
}

window.onload = loadFacts;
