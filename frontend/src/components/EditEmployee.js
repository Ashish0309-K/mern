
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditEmployee.css';

const EditEmployee = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(state?.employee || {});
  const [image, setImage] = useState(null);

  useEffect(() => {
    setEmployee(state?.employee || {});
  }, [state?.employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(employee).forEach(key => formData.append(key, employee[key]));
    if (image) formData.append('image', image);

    try {
      await axios.put(`http://localhost:5000/api/employees/${employee.email}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/employee-list');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="employee-form-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={employee.name || ''} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={employee.email || ''} readOnly />
        </div>
        <div className="form-group">
          <label>Mobile No</label>
          <input type="text" name="mobile" value={employee.mobile || ''} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Designation</label>
          <select name="designation" value={employee.designation || ''} onChange={handleChange} required>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input type="radio" name="gender" value="Male" checked={employee.gender === 'Male'} onChange={handleChange} /> Male
          <input type="radio" name="gender" value="Female" checked={employee.gender === 'Female'} onChange={handleChange} /> Female
        </div>
        <div className="form-group">
          <label>Course</label>
          <select name="course" value={employee.course || ''} onChange={handleChange} multiple>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
          </select>
        </div>
        <div className="form-group">
          <label>Image Upload</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="form-group">
          <button type="submit">Update Employee</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
