const cors = require('cors')
require('dotenv').config()
const express = require('express')
const router = require('./router/router')
const server = express()
server.use(cors())
server.use(express.json())

//router set
server.use(router)
require('./database/connection')

const port = process.env.PORT || 5001;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
