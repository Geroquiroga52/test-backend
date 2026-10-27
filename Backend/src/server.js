require('dotenv').config()

const express = require('express');
const { PrismaClient } = require('../generated/prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter }) 

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5500'
}));

app.use(express.json());

app.post('/login', async (req, res) => {
    const { name, email, password } = req.body;
    const existing = await prisma.users.findUnique({
        where: { email }
    })

    if (existing) {
        return res.status(400).json({ error: 'El usuario ya existe' })
    }

    res.json(req.body);

});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const existing = await prisma.users.findUnique({
        where: { email }
    })

    if (existing) {
        return res.status(400).json({ error: 'El usuario ya existe' })
    }

    res.json(req.body);

});

app.listen(PORT, () => {
    console.log(`Conexión establecida en http://localhost:${PORT}`);
});