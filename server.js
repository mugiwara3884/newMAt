const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files
server.use(express.static(path.join(__dirname, 'public')));

// Route to handle mad lib submission
server.post('/generate-madlib', (req, res) => {
    const { noun, verb, adjective, place, pluralNoun } = req.body;

    // Validate input
    if (!noun || !verb || !adjective || !place || !pluralNoun) {
        res.send(`
            <h1>Error: Incomplete Form</h1>
            <p>Please fill in all the fields!</p>
            <a href="/ITC505/lab-7/index.html">Go Back</a>
        `);
        return;
    }

    // Generate the Mad Lib
    const madLib = `
        In a ${adjective} ${place}, there was a ${noun} who loved to ${verb}.
        They always played with ${pluralNoun} and had a great time!
    `;

    res.send(`
        <h1>Your Mad Lib</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/index.html">Create Another</a>
    `);
});

// Start the server
const port = process.argv[2] === 'local' ? 8080 : 80;
server.listen(port, () => console.log(`Server running on port ${port}`));
