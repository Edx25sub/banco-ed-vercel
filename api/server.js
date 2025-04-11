// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = './db.json';

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve o index.html

// Rota para receber dados do app
app.post('/send', (req, res) => {
    const { nome, user_id, ip, token, anotacao } = req.body;
    const novaEntrada = {
        nome,
        user_id,
        ip,
        token,
        anotacao,
        data_envio: new Date().toISOString()
    };

    let dados = [];
    if (fs.existsSync(DATA_FILE)) {
        dados = JSON.parse(fs.readFileSync(DATA_FILE));
    }

    dados.unshift(novaEntrada);
    fs.writeFileSync(DATA_FILE, JSON.stringify(dados, null, 2));
    res.sendStatus(200);
});

// Rota para fornecer os dados ao HTML
app.get('/data', (req, res) => {
    if (!fs.existsSync(DATA_FILE)) return res.json([]);
    const dados = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(dados);
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
