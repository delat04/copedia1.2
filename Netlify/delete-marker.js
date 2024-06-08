const fs = require('fs');

exports.handler = async (event, context) => {
    const { longitude, latitude } = event.queryStringParameters;

    // Read the JSON file containing marker data
    const data = fs.readFileSync('casas.json', 'utf8');

    try {
        const markersData = JSON.parse(data);
        const updatedMarkers = markersData.features.filter(marker => {
            const coordinates = marker.geometry.coordinates;
            return !(coordinates[0] === parseFloat(longitude) && coordinates[1] === parseFloat(latitude));
        });

        // If marker was found and deleted
        if (updatedMarkers.length < markersData.features.length) {
            const updatedData = { ...markersData, features: updatedMarkers };

            // Write the updated data back to the file
            fs.writeFileSync('casas.json', JSON.stringify(updatedData, null, 2));
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Marker deleted successfully' })
            };
        } else {
            // If marker with given coordinates was not found
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Marker not found' })
            };
        }
    } catch (parseErr) {
        console.error('Error parsing JSON data:', parseErr);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
