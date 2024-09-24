const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// In-memory storage for simplicity
let employees = [];

// Route to create employee
app.post('/api/employees', upload.single('image'), (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file ? req.file.path : null;

    // Ensure course is an array
    const courseArray = Array.isArray(course) ? course : [course];

    // Save employee data
    const newEmployee = { name, email, mobile, designation, gender, course: courseArray, image };
    employees.push(newEmployee);

    res.status(201).json({ message: 'Employee created successfully!' });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Failed to create employee.' });
  }
});


// Route to get employees
app.get('/api/employees', (req, res) => {
  try {
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Failed to fetch employees.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});





// Route to update an employee
app.put('/api/employees/:email', upload.single('image'), (req, res) => {
  try {
    const { email } = req.params;
    const { name, mobile, designation, gender, course } = req.body;
    const image = req.file ? req.file.path : null;

    // Find and update employee
    const employeeIndex = employees.findIndex(emp => emp.email === email);
    if (employeeIndex === -1) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    // Update the employee data
    employees[employeeIndex] = { name, email, mobile, designation, gender, course, image };
    res.status(200).json({ message: 'Employee updated successfully!' });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Failed to update employee.' });
  }
});


// Route to delete an employee
app.delete('/api/employees/:email', (req, res) => {
  try {
    const { email } = req.params;
    const index = employees.findIndex(emp => emp.email === email);
    
    if (index !== -1) {
      employees.splice(index, 1);
      res.status(200).json({ message: 'Employee deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Employee not found.' });
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Failed to delete employee.' });
  }
});
