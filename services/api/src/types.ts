export interface Card {
    id: string;
    question: string;
    answer: string;
    interval: number; // I(n - 1). (number of days)
    repetition: number; // "n"
    easinessFactor: number; // "EF"
    totalCardReviews: number;
    dateAdded: Date;
    dateNextReview: Date;
}

export enum ReviewGrade {
    Blackout = 0,
    Incorrect = 1,
    Hard = 3,
    Good = 4,
    Easy = 5
}

export interface CardRow {
    id: string;
    question: string;
    answer: string;
    interval: number;
    repetition: number,
    easiness_factor: number;
    total_reviews: number;
    date_added: Date;
    date_next_review: Date;
}
