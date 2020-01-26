const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const sanitize = require('sanitize-html');
const app = express();

app.use(bodyParser());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'"]
    }
}));
app.use(express.static('.'));

const comments = [];

app.post('/comments', (request, response) => {
    const comment = request.body.comment;
    const sanitizedComment = sanitize(comment);
    console.log('Original: ', comment, 'sanitized: ', sanitizedComment);
    comments.push(comment);
    response.end('Saved');
});

app.get('/comments', (request, response) => {
    response.end(JSON.stringify(comments));
});

app.listen(7000);