const fs = require('fs');

exports.handler = async (event, context) => {
    // Read the JSON file from the server filesystem
    const data = fs.readFileSync('./casas.json', 'utf8');
    
    return {
        statusCode: 200,
        body: data
    };
};
