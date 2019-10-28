// implement your API here
//import express from 'express' 
const express = require(`express`)

const db= require(`./data/db`)

const server = express();

//middleware need for POST and PUT to work
server.use(express.json())

//handles GET request to /users on localhost:4000
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ error: "No user information found." })
        res.end(users);
    })
})


//GET to /users that returns a list of data
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
    .then(users => {
        if(!users.id){
            res.status(404).json({ message: "The user with that ID doesn't exist." })
        } else {
            res.status(200).json(users)
        }
    })
    .catch(error => {
        res.end()
        res.status(500).json({ message: "The user information could not be retrieved."})
    })
})

//POST to /users
server.post('/api/users', (req, res) => {
    const user = req.body;
    if(!user.bio || !user.name){
        res.status(400).json({ errorMessage: "Need both bio and name." })
        res.end()
    } else {
        db.insert(user)
        .then(users => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: "error added to db" })
        })
    }
})

  //Delete to /users/:id
  server.delete(`/api/users/:id`, (req, res)=> {
      const id = req.params.id

      if(!id){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        db.remove(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: "No user with that ID." })
        })
    }
  })

  //PUT request to /users/:id

  server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;

    if(!user.id){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        db.update(id, user)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: "No user with that ID." })
        })
    }
})


// listen for requests in a particular port on localhost
const port = 4000; // localhost:8000
server.listen(port, () => console.log('\n=== API on port 4000 ===\n'));
