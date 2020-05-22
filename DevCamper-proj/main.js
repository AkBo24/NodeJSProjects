import express from 'express';
const server = express();

server.get('/', (req, res) => {
    const json = {word1: "hi", word2: "bye"};
    res.send(json);
})

server.listen(3000, '127.0.0.1');
console.log('Listening to server 3000 on localhost');
