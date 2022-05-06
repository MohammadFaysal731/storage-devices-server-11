const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('storage-devices-server')
})
app.get('/user', (req, res) => {
    res.send('faysal')
})

app.listen(port, () => {
    console.log('storage-devices-server runing on ', port)
})