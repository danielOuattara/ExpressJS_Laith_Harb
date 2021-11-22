
const express = require('express');

// todos array


const app = express();

app.use(express.json());  // we need to parse json, to get data for the request

app.get('/', (req, res) => {
    return res.send('Hello Express !')
});

app.use('/todos', require ('./routes/todos'))



app.listen(3000, ()=> {
    console.log(`Server is running on port  3000`);
});