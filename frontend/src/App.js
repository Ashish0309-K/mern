import React from 'react';
import { Link, Routes, Route } from 'react-router-dom'; // No need to import BrowserRouter again here
import Home from './components/Home';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/EmployeeForm';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import EditEmployee from './components/EditEmployee';
import './index.css';

const App = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Admin Panel</h1>
        </div>
        <ul className="navbar-links">
          
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/employee-list">Employee List</Link>
          </li>
          <li>
            <Link to="/create-employee">Create Employee</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="navbar-logout">
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-employee" element={<EditEmployee />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
