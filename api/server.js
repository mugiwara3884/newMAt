const express = require('express');

const app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/generate-madlib', (req, res) => {
    const { noun, verb, adjective, place, pluralNoun } = req.body;

    // Validate input
    if (!noun || !verb || !adjective || !place || !pluralNoun) {
        return res.status(400).send(`
            <h1>Error: Incomplete Form</h1>
            <p>Please fill in all the fields!</p>
            <a href="/ITC505/lab-7/index.html">Go Back</a>
        `);
    }

    // Generate the Mad Lib
    const madLib = `
        In a ${adjective} ${place}, there was a ${noun} who loved to ${verb}.
        They always played with ${pluralNoun} and had a great time!
    `;

    res.status(200).send(`
        <h1>Your Mad Lib</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/index.html">Create Another</a>
    `);
});

// Export the app as a serverless function
module.exports = app;
