const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Routes
server.get('/do_a_random', (req, res) => {
    res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
  })

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))


// Handle form submission
server.post('/generate-madlib', (req, res) => {
  const { noun, verb, adjective, place, pluralNoun } = req.body;

  if (!noun || !verb || !adjective || !place || !pluralNoun) {
    res.send(`
    <h1>Error: Incomplete Form</h1>
    <p>Please fill in all the fields!</p>
    <a href="/ITC505/lab-7/index.html">Go Back</a>
    `);
    return;
  }

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
// let port = 80;
// if (process.argv[2] === 'local') {
//   port = 8080;
// }
// server.listen(port, () => console.log('Ready on localhost!'));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server is running on port ${port}`));