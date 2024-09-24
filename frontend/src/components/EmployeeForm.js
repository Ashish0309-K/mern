import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeForm.css'; 

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEmployee((prevState) => ({
        ...prevState,
        course: checked
          ? [...prevState.course, value]
          : prevState.course.filter((item) => item !== value)
      }));
    } else if (type === 'file') {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: e.target.files[0]
      }));
    } else {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('designation', employee.designation);
    formData.append('gender', employee.gender);
    formData.append('course', employee.course.join(',')); // Convert array to comma-separated string
    if (employee.image) {
      formData.append('image', employee.image);
    }
  
    try {
      const response = await axios.post('/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.message);
      setEmployee({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null
      });
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Failed to create employee.');
    }
  };
  
  

  return (
    <div className="employee-form-container">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Mobile No:</label>
          <input
            type="tel"
            name="mobile"
            value={employee.mobile}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Designation:</label>
          <select
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={employee.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={employee.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Course:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={employee.course.includes('MCA')}
                onChange={handleChange}
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={employee.course.includes('BCA')}
                onChange={handleChange}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={employee.course.includes('BSC')}
                onChange={handleChange}
              />
              BSC
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Img Upload:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="file-upload"
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
