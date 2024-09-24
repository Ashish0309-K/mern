import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    
    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    // Navigate to the edit page with employee data
    navigate('/edit-employee', { state: { employee } });
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${email}`);
      setEmployees(employees.filter(emp => emp.email !== email));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><img src={emp.image} alt={emp.name} className="employee-image" /></td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.mobile}</td>
              <td>{emp.designation}</td>
              <td>{emp.gender}</td>
              <td>{Array.isArray(emp.course) ? emp.course.join(', ') : emp.course}</td>
              <td>{new Date().toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
