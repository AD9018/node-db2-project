const express = require("express")

const CarRouter = require("./cars/cars-router")


const server = express()
server.use(express.json())
server.use('/api/cars',CarRouter)

// DO YOUR MAGIC

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})


module.exports = server
