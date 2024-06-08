const fs = require('fs');

exports.handler = async (event, context) => {
    const { username, email, password } = JSON.parse(event.body);

    // Read auth data from JSON file
    const data = fs.readFileSync('auth.json', 'utf8');
    const authData = JSON.parse(data);

    const userExists = authData.users.some(u => u.username === username || u.email === email);

    if (userExists) {
        return {
            statusCode: 409,
            body: JSON.stringify({ message: 'Username or email already exists' })
        };
    }

    // Add new user
    authData.users.push({ username, email, password });

    // Save auth data back to JSON file
    fs.writeFileSync('auth.json', JSON.stringify(authData, null, 2));

    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'User signed up successfully' })
    };
};
