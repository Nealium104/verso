import express from 'express';
import { createCard } from './card.ts';
import { PostgresCardRepository } from './repositories/PostgresCardRepository.ts';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/cards', async (req, res) => {
    try {
        const question = req.body.question;
        const answer = req.body.answer;

        const card = createCard(question, answer);

        const repo = new PostgresCardRepository();
        repo.create(card);

        res.status(201).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database connection error" });
    }
});

app.get('/cards/all', async (req, res) => {
    try {
        const repo = new PostgresCardRepository();

        repo.getAllCards();

        res.status(201).json(card);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Database connection error" });
    }
});

app.get('/cards/due', async (req, res) => {
    try {
        const repo = new PostgresCardRepository();

        const date = new Date();
        const result = await repo.getDueCards(date);

        res.status(201).json(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Database connection error" });
    }
});

app.get('/cards/:id', async (req, res) => {
    try {
        const repo = new PostgresCardRepository();

        const id = req.params.id;
        const result = await repo.getById(id);

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

