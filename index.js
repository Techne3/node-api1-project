// implement your API here
//import express from 'express' 
const express = require(`express`)

const db= require(`./data/db`)

const server = express();

//middleware need for POST and PUT to work
server.use(express.json())

//handles GET request to / on localhost:4000
server.get(`/`, (req,res) => {
    res.send(`hello api project`)
})

//GET to /users that returns a list of data
server.get(`/api/users`, (req,res)=> {
    db.find()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        console.log('error', err)
        res.status(500).json({error: `failed to get data from db`})
    })
})

//POST to /users
server.post('/api/users', (req, res) => {
    const information = req.body;
  
    console.log('hubs information', information);
  
    db.insert(information)
      .then(info => {
        res.status(201).json(info);
      })
      .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to insert the hub to the db' });
      });
  });

  //Delete to /users/:id
  server.delete(`/api/users/:id`, (req, res)=> {
      const id = req.params.id

      db.remove(id).then(count => {
          res.status(200).json({message: `hubs with id ${id} deleted`})
      })
      .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to remove the hub to the db' });
      });
  })

  //PUT request to /users/:id

  server.put(`/api/users/:id`,(req,res) => {
      const ids = req.params.id
      const info = {}

      db.update(ids,info).then(newCount => {
          res.status(200).json({message: `hubs with id ${id} updated`})
      })
      .catch(err => {
          console.log(`error`, err);
          res.status(500).json({error: 'failed to update the hub on the db'})
      })
  })



// listen for requests in a particular port on localhost
const port = 4000; // localhost:8000
server.listen(port, () => console.log('\n=== API on port 4000 ===\n'));
