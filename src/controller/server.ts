import express from 'express';
import { registerUser } from '../db/prisma';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await registerUser(username, password);
        res.json(user);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
