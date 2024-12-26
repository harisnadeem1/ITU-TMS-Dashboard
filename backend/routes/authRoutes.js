const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

// Login Endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
  
    try {
      console.log('Login request received:', email, password);
  
      // Check if user exists
      const [rows] = await pool.query('SELECT * FROM users1 WHERE email = ?', [email]);
      const user = rows[0];
  
      if (!user) {
        console.log('User not found:', email);
        return res.status(404).json({ message: 'User not found' });
      }
  
      //Compare passwords
    //   const isPasswordValid = bcrypt.compareSync(password, user.password);
    //   console.log(password)
    //   console.log("hello");
    //   console.log(user.password);
      console.log(password);
      console.log(user.password);
      if (password!=user.password) {
        console.log('Invalid password for user:', email);
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Fetch user roles
      const [roles] = await pool.query(
        `SELECT r.role_name FROM roles r
         JOIN user_roles ur ON r.id = ur.role_id
         WHERE ur.user_id = ?`,
        [user.id]
      );
  
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  
      console.log('Login successful for user:', email);
      res.json({ user: { id: user.id, email: user.email }, roles: roles.map((r) => r.role_name), token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
