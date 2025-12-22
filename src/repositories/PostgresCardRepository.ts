import { pool } from '../db.ts';
import { CardRepository } from './CardRepository.ts';
import type { Card, CardRow } from '../types.ts';

class PostgresCardRepository implements CardRepository {
    async create(card: Card): Promise<void> {
        const query = 'INSERT INTO cards (id, question, answer, interval, repetition, easinessFactor, totalCardReviews, dateAdded, dateNextReview) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
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
        return await pool.query(query, values);
    }
}
