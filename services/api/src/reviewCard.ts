import { PostgresCardRepository } from "./repositories/PostgresCardRepository.js";
import { calculateReview } from "./algo.js";

export async function reviewCard(id: string, grade: number) {
    const repo = new PostgresCardRepository();

    let card = await repo.getById(id);
    if(!card) return null;

    const updatedCard = calculateReview(card, grade);

    await repo.updateCard(updatedCard);
}
