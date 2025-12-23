import type { Card } from '../types.ts';

export interface CardRepository {
    create(card: Card): Promise<void>,
    getById(id: string): Promise<Card | null>,
    getDueCards(date: Date): Promise<Card[]>
    updateCard(id: string, card: Card): Promise<void>
}
