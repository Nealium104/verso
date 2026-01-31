let mode = "question";
let dueCards = [];
let currentCardIndex = 0;

const cardTitle = document.querySelector("#card-title");
const cardContent = document.querySelector("#card-content");
const cardOptions = document.querySelector("#card-options");
const createCardForm = document.querySelector("#create-card-form");

async function init() {
    try {
        dueCards = await getDueCards("/api/cards/due");

        if (!dueCards || dueCards.length === 0) {
            cardContent.innerText = "no cards due";
            return;
        }
        cardContent.innerText = dueCards[currentCardIndex].question;
    } catch (e) {
        console.error("Failed:", e);
        cardContent.innerText = "Error loading card";
    }
}

function renderCard(index) {
    const card = dueCards[index];

    if(!card) return;

    cardContent.innerText = card.question;
}

function setOptions(currentMode){
    if (currentMode === "question") {
        cardTitle.innerText = "question";
        cardOptions.innerHTML = "<button>answer</button>";
        return;
    }
    cardTitle.innerHTML = "answer";
    cardOptions.innerHTML = "<li>instant</li>\n<li>secs</li>\n<li>&#60 min</li>\n<li>mins</li>\n<li>blank</li>"
}

async function getDueCards(url){
    try {
        const response = await fetch(`/api/cards/due`);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (e) {
        console.error(e.message);
        return [];
    }
}
    cardOptions.addEventListener('click', () => {
        if(mode === "question") {
            mode = "answer";
            const card = dueCards[currentCardIndex];
            cardContent.innerText = card.answer;
            setOptions(mode);
        } else {
            currentCardIndex++;
            mode = "question";

            if (currentCardIndex >= dueCards.length) {
                cardContent.innerText = "no cards due";
            } else {
                renderCard(currentCardIndex);
                setOptions(mode);
            }
        }
    });

async function createCard(){
    try {
        const response = await fetch(`/cards/create`);

        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (e) {
        console.error(e.message);
        return;
    }
}

createCardForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const response = await fetch('/api/cards/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        console.error("Card could not be created");
    }
})



init();
