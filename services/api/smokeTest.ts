import { createCard } from './src/card.ts';
import { PostgresCardRepository } from './src/repositories/PostgresCardRepository.ts';
import { reviewCard } from './src/reviewCard.ts';
import { end } from './src/db.ts';

const card = createCard("What is TypeScript a superset of?", "JavaScript");
const repo = new PostgresCardRepository();

console.log("Creating card...");
await repo.create(card);
const resultCreate = await repo.getById(card.id);
console.log(resultCreate);

console.log("Updating Card...");
card.question = "What is TS a superset of?"
card.answer = "JS"
await repo.updateCard(card);
const resultUpdate = await repo.getById(card.id);
console.log(resultUpdate);

console.log("Reviewing card...")
await reviewCard(card.id, 4);

const resultFirstReview = await repo.getById(card.id);
console.log(`Current Interval: ${resultFirstReview?.interval}`);
console.log(`Current Repetitions: ${resultFirstReview?.repetition}`);

await reviewCard(card.id, 5);
const resultSecondReview = await repo.getById(card.id);

console.log(`Current Interval: ${resultSecondReview?.interval}`);
console.log(`Current Repetitions: ${resultSecondReview?.repetition}`);

console.log(`3. Deleting Card...`);
await repo.deleteCard(card.id);

const check = await repo.getById(card.id);
if (check === null) {
    console.log("Card was deleted.");
} else {
    throw new Error("Card still exists!");
}

await end();
