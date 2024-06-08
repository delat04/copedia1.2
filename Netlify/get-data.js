const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    try {
        // Construct the absolute file path to casas.json
        const filePath = path.resolve(__dirname, 'casas.json');

        // Read the contents of casas.json file
        const data = fs.readFileSync(filePath, 'utf8');

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
};
