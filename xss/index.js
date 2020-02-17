const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const sanitize = require('sanitize-html');
const app = express();

const whitelist = {
    allowedTags: [ 'i', 'em', 'strong', 'a' ],
    allowedAttributes: {
        'a': [ 'href' ]
    },
    allowedIframeHostnames: ['www.youtube.com']
};

app.use(bodyParser());
// Uncomment the lines below to make the vulnerable application resistant to the XSS attack.
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//         defaultSrc: ["'self'"],
//         styleSrc: ["'self'"]
//     }
// }));
app.use(express.static('.'));

const comments = [];

app.post('/comments', (request, response) => {
    let comment = request.body.comment;
    // Uncomment the line below to make the vulnerable application resistant to the XSS attack.
    // comment = sanitize(comment, whitelist);
    comments.push(comment);
    response.end('Saved');
});

app.get('/comments', (request, response) => {
    response.end(JSON.stringify(comments));
});

app.listen(7000);