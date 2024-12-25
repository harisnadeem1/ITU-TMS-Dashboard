const express = require('express');
const pool = require('../db');

const router = express.Router();

// Fetch All Employees
router.get('/employees', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch Employee by ID
router.get('/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




router.post('/employees/filter', async (req, res) => {
    const { category, department, staff, designation } = req.body;
  
    try {
      let query = 'SELECT * FROM employees WHERE 1=1'; // Base query
      const params = [];
  
      // Add filters dynamically based on the provided values
      if (category) {
        query += ' AND category = ?';
        params.push(category);
      }
      if (department) {
        query += ' AND department = ?';
        params.push(department);
      }
      if (staff) {
        query += ' AND staff = ?';
        params.push(staff);
      }
      if (designation) {
        query += ' AND designation = ?';
        params.push(designation);
      }
  
      const [rows] = await pool.query(query, params);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching filtered employees:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
