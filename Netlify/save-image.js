const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    const { image } = event.files;

    if (!image) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'No image file provided' })
        };
    }

    const imagePath = path.join('/tmp', image.name);

    try {
        fs.writeFileSync(imagePath, image.data, 'binary');
        const imageUrl = `/tmp/${image.name}`;
        return {
            statusCode: 200,
            body: JSON.stringify({ url: imageUrl })
        };
    } catch (err) {
        console.error('Error saving image:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
