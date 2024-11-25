const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));



// Serve static files from the "public" directory
server.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "public" folder
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));


// Handle form submission
server.post('/submit', (req, res) => {
  const { noun, verb, adjective, place, pluralNoun } = req.body;

  if (!noun || !verb || !adjective || !place || !pluralNoun) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
    return;
  }

  const madLib = `
    Once upon a time in a ${adjective} ${place}, there lived a ${noun} 
    who loved to ${verb} with ${pluralNoun}.
  `;

  res.send(`
    <h1>Mad Lib Result</h1>
    <p>${madLib}</p>
    <a href="/ITC505/lab-7/index.html">Create Another Mad Lib</a>
  `);
  
});


// Start the server
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}
server.listen(port, () => console.log('Ready on localhost!'));
