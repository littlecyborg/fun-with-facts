let visitorCount = 0;
let timeSpent = 0;
let interval;

// Simulate a small set of facts (mock data - for the prototype)
const facts = [
    {
        "fact": "Did you know that honey never spoils?",
        "image": "images/honey.jpg",
        "video": "",
        "subtopic": "Food Facts"
    },
    {
        "fact": "A day on Venus is longer than a year on Venus.",
        "image": "",
        "video": "videos/venus.mp4",
        "subtopic": "Space Facts"
    },
    {
        "fact": "The Eiffel Tower can be 15 cm taller during the summer.",
        "image": "images/eiffel.jpg",
        "video": "",
        "subtopic": "Landmarks"
    }
];

// Load and display a random fact when the page loads
window.onload = function() {
    displayFact(facts[Math.floor(Math.random() * facts.length)]);
    
    // Visitor Count (mock)
    visitorCount++;
    document.getElementById("visitor-count").innerText = visitorCount;

    // Track time spent on the page
    interval = setInterval(function() {
        timeSpent++;
        document.getElementById("time-spent").innerText = timeSpent;
    }, 60000); // Update every minute

    // Reaction buttons
    document.getElementById("thumbs-up").addEventListener("click", function() {
        alert("You liked this fact!");
    });

    document.getElementById("thumbs-down").addEventListener("click", function() {
        alert("You disliked this fact!");
    });
};

// Display fact and media (image or video)
function displayFact(fact) {
    document.getElementById("fact-text").innerText = fact.fact;

    if (fact.image) {
        document.getElementById("fact-image").src = fact.image;
        document.getElementById("fact-image").style.display = "block";
        document.getElementById("fact-video").style.display = "none";
    } else if (fact.video) {
        document.getElementById("fact-video-source").src = fact.video;
        document.getElementById("fact-video").style.display = "block";
        document.getElementById("fact-image").style.display = "none";
    }
}

// Stop tracking time if the user leaves the page
window.onbeforeunload = function() {
    clearInterval(interval);
};
