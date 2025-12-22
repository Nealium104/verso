import { createCard } from '../src/card.ts';
import { calculateReview } from '../src/algo.ts';

test('returns a new card', () => {
    const card = createCard("What is TypeScript a superset of?", "JavaScript");
    expect(card).toEqual({
        id: expect.any(String),
        question: "What is TypeScript a superset of?",
        answer: "JavaScript",
        interval: 0,
        repetition: 0,
        easinessFactor: 2.5,
        totalCardReviews: 0,
        dateAdded: expect.any(Date),
        dateNextReview: expect.any(Date)
    });
});

test('returns new card with updated Easiness Factor', () => {
    const card = createCard("What is TypeScript a superset of?", "JavaScript");
    const newCard = calculateReview(card, 5);

    expect(newCard.easinessFactor).toEqual(2.6);
    expect(newCard.repetition).toEqual(1);
    expect(newCard.interval).toEqual(1);
});

test('Test interval resets', () => {
    let card = createCard("What is TypeScript a superset of?", "JavaScript");
    card.interval = 100;

    const result = calculateReview(card, 1);
    expect(result.interval).toBe(1);
    expect(result.repetition).toBe(0);
});
