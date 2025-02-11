document.addEventListener('DOMContentLoaded', () => {
    let facts = []; // Array to hold facts
    let currentPage = 1;
    const factsPerPage = 3;

    const factContainer = document.getElementById('factContainer');
    const uploadForm = document.getElementById('uploadForm');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Event listener to handle fact submission
    uploadForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const factTitle = document.getElementById('factTitle').value;
        const factText = document.getElementById('factText').value;
        const mediaFile = document.getElementById('media').files[0];

        const newFact = {
            title: factTitle,
            text: factText,
            media: URL.createObjectURL(mediaFile),
            reactions: { thumbsUp: 0, thumbsDown: 0 },
            comments: [],
            dateAdded: new Date()
        };

        facts.push(newFact);
        displayFacts(currentPage);
        uploadForm.reset();
    });

    // Display facts based on current page
    function displayFacts(page) {
        factContainer.innerHTML = '';
        const startIndex = (page - 1) * factsPerPage;
        const endIndex = startIndex + factsPerPage;
        const pageFacts = facts.slice(startIndex, endIndex);

        pageFacts.forEach(fact => {
            const factDiv = document.createElement('div');
            factDiv.classList.add('fact');

            const factTitle = document.createElement('h2');
            factTitle.textContent = fact.title;
            factDiv.appendChild(factTitle);

            const factText = document.createElement('p');
            factText.textContent = fact.text;
            factDiv.appendChild(factText);

            const mediaDiv = document.createElement('div');
            if (fact.media.includes('image')) {
                const img = document.createElement('img');
                img.src = fact.media;
                mediaDiv.appendChild(img);
            } else if (fact.media.includes('video')) {
                const video = document.createElement('video');
                video.controls = true;
                const source = document.createElement('source');
                source.src = fact.media;
                video.appendChild(source);
                mediaDiv.appendChild(video);
            }
            factDiv.appendChild(mediaDiv);

            const reactionButtons = document.createElement('div');
            reactionButtons.classList.add('reaction-buttons');
            const thumbsUp = document.createElement('button');
            thumbsUp.textContent = `👍 ${fact.reactions.thumbsUp}`;
            thumbsUp.addEventListener('click', () => {
                fact.reactions.thumbsUp++;
                displayFacts(currentPage);
            });

            const thumbsDown = document.createElement('button');
            thumbsDown.textContent = `👎 ${fact.reactions.thumbsDown}`;
            thumbsDown.addEventListener('click', () => {
                fact.reactions.thumbsDown++;
                displayFacts(currentPage);
            });

            reactionButtons.appendChild(thumbsUp);
            reactionButtons.appendChild(thumbsDown);
            factDiv.appendChild(reactionButtons);

            // Comments section
            const commentSection = document.createElement('div');
            commentSection.classList.add('comment-section');
            fact.comments.forEach(comment => {
                const commentBox = document.createElement('div');
                commentBox.classList.add('comment-box');
                commentBox.textContent = comment;
                commentSection.appendChild(commentBox);
            });

            const commentInput = document.createElement('textarea');
            commentInput.placeholder = 'Write a comment...';
            const commentButton = document.createElement('button');
            commentButton.textContent = 'Post Comment';
            commentButton.addEventListener('click', () => {
                if (commentInput.value) {
                    fact.comments.push(commentInput.value);
                    displayFacts(currentPage);
                }
            });

            commentSection.appendChild(commentInput);
            commentSection.appendChild(commentButton);
            factDiv.appendChild(commentSection);

            factContainer.appendChild(factDiv);
        });

        updatePaginationButtons();
    }

    // Pagination controls
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayFacts(currentPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(facts.length / factsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayFacts(currentPage);
        }
    });

    function updatePaginationButtons() {
        const totalPages = Math.ceil(facts.length / factsPerPage);
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    // Initial load
    displayFacts(currentPage);
});
