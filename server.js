// server.js
const express = require('express');
const path = require('path');
const dbPromise = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota de Cadastro
app.post('/usuarios', async (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ erro: 'Informe nome e e-mail.' });
  }
  try {
    const db = await dbPromise;
    const resultado = await db.run(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    res.status(201).json({ id: resultado.lastID, nome, email });
  } catch (erro) {
    res.status(500).json({ erro: 'Não foi possível cadastrar.' });
  }
});

// Rota de Consulta
app.get('/usuarios', async (req, res) => {
  try {
    const db = await dbPromise;
    const usuarios = await db.all(
      'SELECT id, nome, email, criado_em FROM usuarios ORDER BY id DESC'
    );
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: 'Não foi possível consultar.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});
