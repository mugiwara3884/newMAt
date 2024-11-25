const { parse } = require('querystring');

module.exports = (req, res) => {
    if (req.method === 'POST') {
        let body = '';

        // Collect data from the POST request
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { noun, verb, adjective, place, pluralNoun } = parse(body);

            // Validate input
            if (!noun || !verb || !adjective || !place || !pluralNoun) {
                return res.status(400).send(`
                    <h1>Error: Incomplete Form</h1>
                    <p>Please fill in all the fields!</p>
                    <a href="/">Go Back</a>
                `);
            }

            // Generate the Mad Lib
            const madLib = `
                In a ${adjective} ${place}, there was a ${noun} who loved to ${verb}.
                They always played with ${pluralNoun} and had a great time!
            `;

            return res.status(200).send(`
                <h1>Your Mad Lib</h1>
                <p>${madLib}</p>
                <a href="/ITC505/lab-7/index.html">Create Another</a>
                `);
        });
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
