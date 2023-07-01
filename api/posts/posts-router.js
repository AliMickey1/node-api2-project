// implement your posts router here
const express = require('express')
const thePost = require('./posts-model')

const router = express.Router()

router.get('/', (req, res) => {
    thePost.find()
    .then(found => {
        res.json(found)
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved",
            err: err.message,
            stack: err.stack ,
        })
    })
})

router.get('/:id', async (req, res) => {
    try {    
        const hold = await thePost.findById(req.params.id)
        if(!hold) {
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
        } else {
            res.json(hold)
        }
    } catch(err) {
        res.status(500).json({
            message: "The post information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    }
})

router.post('/', (req, res) => {
    const { title, contents } = req.body
    if(!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        thePost.insert({ title, contents })
        .then(({id}) => {
            return thePost.findById(id)
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
                err: err.message,
                stack: err.stack,
            })
        })
    }

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', async (req, res) => {
    try {
        const possible = await thePost.findById(req.params.id) 
        if(!possible) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            const deletePost = await thePost.remove(possible)
        }
    }
    catch(err) {
        res.status(500).json({
            message: "The post could not be removed",
            err: err.message,
            stack: err.stack,
        })
    }
})

router.get('/:id/comments', (req, res) => {

})

module.exports = router
