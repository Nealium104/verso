process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

import express from 'express';
import { createCard } from './card.ts';
import { PostgresCardRepository } from './repositories/PostgresCardRepository.ts';

const app = express();
const port = 3000;

app.use(express.json());

const repo = new PostgresCardRepository();

app.post('/cards', async (req, res) => {
    try {
        const question = req.body.question;
        const answer = req.body.answer;

        const card = createCard(question, answer);

        await repo.create(card);

        res.status(201).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database connection error" });
    }
});

app.get('/cards/all', async (req, res) => {
    try {
        const cards = await repo.getAllCards();

        res.status(201).json(cards);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Database connection error" });
    }
});

app.get('/cards/due', async (req, res) => {
    try {
        const date = new Date();
        const cards = await repo.getDueCards(date);

        res.status(201).json(cards);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Database connection error" });
    }
});

app.get('/cards/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const card = await repo.getById(id);

        if(!card){
            res.status(404).json({ error: "Card not found!" });
            return;
        }

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database connection error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
