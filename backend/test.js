const bcrypt = require('bcrypt');

// Generate a new hash
const password = 'admin123'; // Replace with your desired password
const hashedPassword = bcrypt.hashSync(password, 10);

console.log('Hashed Password:', hashedPassword);
