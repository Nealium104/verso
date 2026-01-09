const url = "http://howl:3000";

let mode = "question";
let dueCards = [];
let currentCardIndex = 0;

const cardTitle = document.querySelector("#card-title");
const cardContent = document.querySelector("#card-content");
const cardOptions = document.querySelector("#card-options");

async function init() {
    try {
        cardContent.innerText = "Loading card"

        dueCards = await getDueCards(url);

        if (!dueCards || dueCards.length === 0) {
            cardContent.innerText = "No cards due";
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
        const response = await fetch(`${url}/cards/due`);

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

init();
