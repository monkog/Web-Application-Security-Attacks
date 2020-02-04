const express = require('express');
const helmet = require('helmet');
const app = express();

// Uncomment the line below to make the vulnerable application resistant to the clickjacking attack.
// app.use(helmet());
app.use(express.static('.'));

app.listen(7000);