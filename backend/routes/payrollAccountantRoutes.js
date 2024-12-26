const express = require("express");
const pool = require("../db");

const router = express.Router();

// Fetch All Employees
router.get("/employees", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch Employee by ID
router.get("/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Employee not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/employees/filter", async (req, res) => {
  const { category, department, staff, designation } = req.body;

  try {
    let query = "SELECT * FROM employees WHERE 1=1"; // Base query
    const params = [];

    // Add filters dynamically based on the provided values
    if (category) {
      query += " AND category = ?";
      params.push(category);
    }
    if (department) {
      query += " AND department = ?";
      params.push(department);
    }
    if (staff) {
      query += " AND staff = ?";
      params.push(staff);
    }
    if (designation) {
      query += " AND designation = ?";
      params.push(designation);
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching filtered employees:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Search Employees by Term
router.get("/employees/search/:term", async (req, res) => {
  const { term } = req.params;
  console.log("enterd in search route");

  if (!term || term.trim() === "") {
    return res.status(400).json({ message: "Search term is required" });
  }

  console.log("If passed");

  try {
    const query = `
      SELECT * FROM employees
      WHERE name LIKE ?
         OR category LIKE ?
         OR department LIKE ?
         OR designation LIKE ?
         OR remarks LIKE ?
    `;
    const searchTerm = `%${term}%`;
    const [rows] = await pool.query(query, [
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
    ]);
    //console.log(rows)
    res.json(rows);
  } catch (error) {
    console.error("Error searching employees:", error);
    res.status(500).json({ message: "Server error while searching employees" });
  }
});







router.get("/employees/:id/additional-fields", async (req, res) => {
  console.log("In api");
  const { id } = req.params;

  

  try {
    // Fetch employee details
    const [employeeRows] = await pool.query(`SELECT * FROM employees WHERE id = ?`, [id]);
    if (employeeRows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    //console.log("If passed");
    const employee = employeeRows[0];

    console.log(employee.category);

    // Query the respective table based on category
    let query = "";


    switch (employee.category) {
      case "TTS Staff":
        console.log("Switch TTs Staff");

        query = `SELECT * FROM tts_staff_fields WHERE employee_id = ?`;
        break;
      case "TTS Support Staff":
        query = `SELECT * FROM tts_support_staff_fields WHERE employee_id = ?`;
        break;
      case "Support Staff":
        query = `SELECT * FROM support_staff_fields WHERE employee_id = ?`;
        break;
      case "School Staff RA":
        query = `SELECT * FROM school_staff_ra_fields WHERE employee_id = ?`;
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
    }

    //console.log("switch passed")

    const [fields] = await pool.query(query, [id]);

    if (fields.length === 0) {
      return res.status(404).json({ message: "No additional fields found for this employee" });
    }

    res.json({
      employee: {
        id: employee.id,
        name: employee.name,
        category: employee.category,
        designation: employee.designation,
      },
      additional_fields: fields[0],
    });
  } catch (error) {
    console.error("Error fetching additional fields:", error);
    res.status(500).json({ message: "Server error while fetching additional fields" });
  }
});

module.exports = router;
