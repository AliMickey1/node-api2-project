// implement your server here
const express = require('express')

const server = express()
const postsRouter = require('./posts/posts-router')

server.use(express.json())
server.use('/posts', postsRouter)

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server