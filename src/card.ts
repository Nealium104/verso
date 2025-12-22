import type { Card } from './types.ts';
import { v4 as uuid } from 'uuid';

export function createCard(question: string, answer: string): Card {
    const startingInterval = 0;

    return {
        id: uuid(),
        question: question,
        answer: answer,
        interval: startingInterval,
        repetition: 0,
        easinessFactor: 2.5, // starting point for EF
        totalCardReviews: 0,
        dateAdded: new Date(),
        dateNextReview: nextDate(startingInterval),
    }
}

export function nextDate(days: number){
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date
}
