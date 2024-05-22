const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use('/assets', express.static(path.join(__dirname, '/vue-app-dist/assets')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/vue-app-dist/index.html");
})

app.get('/hello-world', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
