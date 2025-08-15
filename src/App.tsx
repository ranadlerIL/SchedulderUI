import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CustomerHome from './components/customer/CustomerHome.tsx';
import BusinessLogin from './components/business/BusinessLogin.tsx';
import BusinessDashboard from './components/business/BusinessDashboard.tsx';
import CustomerLogin from './components/customer/CustomerLogin.tsx';
import CustomerDashboard from './components/customer/CustomerDashboard.tsx';
import BusinessSignup from './components/business/BusinessSignup.tsx';

function App() {
  return (
    <div className="App" dir="rtl">
      <Router>
        <Routes>
          <Route path="/" element={<CustomerHome />} />
          <Route path="/business/login" element={<BusinessLogin />} />
          <Route path="/business/signup" element={<BusinessSignup />} />
          <Route path="/business/dashboard" element={<BusinessDashboard />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
