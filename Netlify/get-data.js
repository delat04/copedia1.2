const fs = require('fs');

app.get('/data', (req, res) => {
    // Read the JSON file from the server filesystem
    fs.readFile('casas.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Send the JSON data as a response to the client
        res.json(JSON.parse(data));
    });
});
