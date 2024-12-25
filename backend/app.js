const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);


const payrollAccountantRoutes = require('./routes/payrollAccountantRoutes'); // Import routes
app.use('/api/payroll', payrollAccountantRoutes); // Register routes


// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Login API. Use /api for endpoints.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
