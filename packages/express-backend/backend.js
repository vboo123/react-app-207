// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Extend the findUserByName function to also filter by job
const findUserByNameAndJob = (name, job) => {
    return users['users_list']
        .filter((user) => {
            return (!name || user['name'] === name) && (!job || user['job'] === job);
        });
}

// Update the '/users' route to accept name and job query parameters
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name || job) {
        const result = findUserByNameAndJob(name, job);
        res.send({ users_list: result });
    } else {
        res.send(users);
    }
});

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
    
//using a path variable here
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        //delete this user defined by id from users 
        for (let i in users["users_list"])
        if (users["users_list"][i]['id'] == id) delete users["users_list"].splice([i],1
            );
            res.send()
    }});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      