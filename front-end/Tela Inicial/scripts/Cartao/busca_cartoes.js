// This file contains the JavaScript code that manages the functionality of the page, including adding and deleting cards, and updating the display based on the current state of the cards.

let cards = [];

function renderCards() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if (cards.length === 0) {
        cardContainer.innerHTML = '<p>No cards available.</p>';
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Card';
        addButton.onclick = addCard;
        cardContainer.appendChild(addButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete All';
        deleteButton.onclick = deleteAllCards;
        cardContainer.appendChild(deleteButton);
    } else {
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.textContent = card;
            cardElement.onclick = () => deleteCard(index);
            cardContainer.appendChild(cardElement);
        });
    }
}

function addCard() {
    const cardName = prompt('Enter card name:');
    if (cardName) {
        cards.push(cardName);
        renderCards();
    }
}

function deleteCard(index) {
    cards.splice(index, 1);
    renderCards();
}

function deleteAllCards() {
    cards = [];
    renderCards();
}

// Initial render
renderCards();