const Employee = require('../models/Employee');

const createEmployee = async (req, res) => {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Image } = req.body;

  const employee = new Employee({
    f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Image
  });

  try {
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ message: 'Error creating employee', error });
  }
};

const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

module.exports = { createEmployee, getEmployees };
