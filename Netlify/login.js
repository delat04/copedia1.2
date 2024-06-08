const fs = require('fs');

exports.handler = async (event, context) => {
    const { username, password } = JSON.parse(event.body);

    // Read auth data from JSON file
    const data = fs.readFileSync('auth.json', 'utf8');
    const authData = JSON.parse(data);
    
    const user = authData.users.find(u => u.username === username && u.password === password);

    if (user) {
        // Authentication successful
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Login successful', user })
        };
    } else {
        // Authentication failed
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Invalid username or password' })
        };
    }
};
