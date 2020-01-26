const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser());
app.use(express.static('.'));

const comments = [];

app.post('/comments', (request, response) => {
    const comment = request.body.comment;
    comments.push(comment);
    response.end('Saved');
});

app.get('/comments', (request, response) => {
    response.end(JSON.stringify(comments));
});

app.listen(7000);