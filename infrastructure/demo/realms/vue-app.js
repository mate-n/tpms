//const express = require('express')
import express from 'express'
const app = express()
const port = 3000
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
//const path = require('path')

app.use('/assets', express.static(path.join(__dirname, '/dist/assets')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
})

app.get('/hello-world', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
