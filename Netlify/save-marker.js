const fs = require('fs');

exports.handler = async (event, context) => {
    const markerData = JSON.parse(event.body);

    // Read the existing markers data
    const data = fs.readFileSync('casas.json', 'utf8');

    // Parse the existing data
    let markersData;
    try {
        markersData = JSON.parse(data);
    } catch (parseErr) {
        console.error('Error parsing JSON data:', parseErr);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }

    // Add the new marker data
    markersData.features.push(markerData);

    // Write the updated data back to the file
    try {
        fs.writeFileSync('casas.json', JSON.stringify(markersData, null, 2));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Marker saved successfully' })
        };
    } catch (err) {
        console.error('Error saving marker data:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
