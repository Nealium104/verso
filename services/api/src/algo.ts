import type { Card } from "./types.js";

export function calculateReview(card: Card, grade: number): Card {
    const isCorrect = grade >= 3;


    let newRepetition: number;
    let newInterval: number;

    if (isCorrect) {
        newRepetition = card.repetition + 1;
        if(newRepetition === 1){
            newInterval = 1;
        } else if (newRepetition === 2) {
            newInterval = 6;
        } else {
            // See /docs/algorithm
            // I(n) = I(n - 1) * EF
            newInterval = Math.round(card.interval * card.easinessFactor);
        }
    } else {
        newRepetition = 0;
        newInterval = 1;
    }

    // SM2 says don't fall below 1.3, but see if this needs adjusting
    let newEf = calculateEasinessFactor(card.easinessFactor, grade);
    if (newEf < 1.3){
        newEf = 1.3;
    }

    return {
        ...card,
        repetition: newRepetition,
        interval: newInterval,
        easinessFactor: newEf,
        dateNextReview: getNextDate(newInterval),
        totalCardReviews: card.totalCardReviews + 1
    };
}

function getNextDate(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

function calculateEasinessFactor(currentEF: number, grade: number): number {
    // magic numbers as part of original SM2 algorithm
    return currentEF-0.8+0.28*grade-0.02*grade*grade
}
