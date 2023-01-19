const express = require('express')
const app = express()
const routes = require("./router/routes")
require('dotenv').config();
require("./db")

app.use(express.json())
app.use("/", routes)

app.listen(3000, () => {
    console.log(`Running on port 3000`)
})
