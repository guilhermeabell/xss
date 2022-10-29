const express = require('express');
const app = express();

const HTTP_PORT = 8000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') { return res.sendStatus(200); }

    next();
});

const messagesDb = [];
app.get('/messages', (req, res) => {
    res.status(200).json({ messages: messagesDb });
});

app.post('/message', express.json(), (req, res) => {
    const message = req.body.message;

    messagesDb.push({
        id: new Date().getTime(),
        messageHtml: message
    });

    res.status(200).json({ ok: true });
});

app.listen(HTTP_PORT, () => {
    console.log(`We are alive on http://localhost:${8000}`);
});
