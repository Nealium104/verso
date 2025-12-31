import { pool } from '../db.js';
import type { CardRepository } from './CardRepository.js';
import type { Card } from '../types.js';

export class PostgresCardRepository implements CardRepository {
    async create(card: Card): Promise<void> {
        const query = 'INSERT INTO cards (id, question, answer, interval, repetition, easiness_factor, total_reviews, date_added, date_next_review) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        const values = [
            card.id, // $1
            card.question, // $2
            card.answer, // $3
            card.interval, // $4
            card.repetition, // $5
            card.easinessFactor, // $6
            card.totalCardReviews, // $7
            card.dateAdded, // $8
            card.dateNextReview // $9
       ];
        await pool.query(query, values);
    }

    async getById(id: string): Promise<Card | null> {
        const query = 'SELECT * FROM cards WHERE id = $1';
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) return null;

        const row = result.rows[0];

        return {
            id: row.id,
            question: row.question,
            answer: row.answer,
            interval: row.interval,
            repetition: row.repetition,
            easinessFactor: row.easiness_factor,
            totalCardReviews: row.total_reviews,
            dateAdded: row.date_added,
            dateNextReview: row.date_next_review

        }
    }

    async getAllCards(): Promise<Card[]> {
        const query = 'SELECT * FROM cards';

        const result = await pool.query(query, []);

        const rows: Card[] = [];
        for (const row of result.rows) {
            rows.push({
                id: row.id,
                question: row.question,
                answer: row.answer,
                interval: row.interval,
                repetition: row.repetition,
                easinessFactor: row.easiness_factor,
                totalCardReviews: row.total_reviews,
                dateAdded: row.date_added,
                dateNextReview: row.date_next_review
            });
        }
        return rows;
    }

    async getDueCards(date: Date): Promise<Card[]> {
        const query = 'SELECT * FROM cards WHERE date_next_review <= $1';

        const result = await pool.query(query, [date]);

        const rows: Card[] = [];
        for (const row of result.rows) {
            rows.push({
                id: row.id,
                question: row.question,
                answer: row.answer,
                interval: row.interval,
                repetition: row.repetition,
                easinessFactor: row.easiness_factor,
                totalCardReviews: row.total_reviews,
                dateAdded: row.date_added,
                dateNextReview: row.date_next_review
            });
        }
        return rows;
    }

    async updateCard(card: Card): Promise<void> {
        const query = 'UPDATE cards SET question = $1, answer = $2, interval = $3, repetition = $4, easiness_factor = $5, date_next_review = $6 WHERE id = $7'

        const values = [
            card.question, // $1
            card.answer, // $2
            card.interval, // $3
            card.repetition, // $4
            card.easinessFactor, // $5
            card.dateNextReview, // $6
            card.id, // $7
        ]

        await pool.query(query, values);
    }

    async deleteCard(id: string): Promise<void> {
        const query = 'DELETE FROM cards WHERE id = $1';

        await pool.query(query, [id]);
    }
}
