import type { Card } from '../types.ts';

export interface CardRepository {
    create(card: Card): Promise<void>,
    getById(id: string): Promise<Card | null>,
    getDueCards(dat: Date): Promise<Card[]>
}
