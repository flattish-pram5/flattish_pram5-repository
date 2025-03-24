const express = require('express');
const app = express();
const port = 1228;

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Привіт!');
});

app.get('/json', (req, res) => {
    res.json({ message: "Це JSON-відповідь" });
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Користувач з ID: ${userId}`);
});

app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`Пошук за запитом: ${query}`);
});

app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});