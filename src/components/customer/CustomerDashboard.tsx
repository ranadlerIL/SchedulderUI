import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { Appointment } from '../../types';
import { mockAppointments } from '../../data/mockData.ts';

const CustomerDashboard: React.FC = () => {
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const phone = localStorage.getItem('customerPhone');
    if (!phone) {
      navigate('/customer/login');
      return;
    }
    
    setCustomerPhone(phone);
    
    // Filter appointments for this customer
    const customerAppointments = mockAppointments.filter(apt => apt.customerPhone === phone);
    setAppointments(customerAppointments);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('customerPhone');
    navigate('/');
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    if (window.confirm('האם אתה בטוח שברצונך לבטל את התור?')) {
      // In a real app, this would call the backend
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      alert('התור בוטל בהצלחה');
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'אושר';
      case 'pending': return 'ממתין לאישור';
      case 'waiting': return 'רשימת המתנה';
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'approved': return 'approved';
      case 'pending': return 'pending';
      case 'waiting': return 'waiting';
      default: return '';
    }
  };

  const approvedAppointments = appointments.filter(apt => apt.status === 'approved');
  const pendingAppointments = appointments.filter(apt => apt.status !== 'approved');

  return (
    <div>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <h1>לוח בקרה - לקוח</h1>
                         <ul className="nav-links">
               <li><a href="/">חזרה לדף הבית</a></li>
               <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'center' }}>התנתק</button></li>
             </ul>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="card">
          <h2>ברוך הבא!</h2>
          <p>מספר טלפון: {customerPhone}</p>
        </div>

                 {/* Approved Appointments */}
         <div className="card">
           <h3 style={{ marginBottom: '20px' }}>תורים מאושרים</h3>
           {approvedAppointments.length === 0 ? (
             <p>אין תורים מאושרים</p>
           ) : (
            <div className="appointment-list">
              {approvedAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-header">
                    <h4>{appointment.serviceName}</h4>
                    <span className={`appointment-status ${getStatusClass(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                  <p><strong>תאריך:</strong> {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: he })}</p>
                  <p><strong>שעה:</strong> {appointment.time}</p>
                  {appointment.comment && <p><strong>הערה:</strong> {appointment.comment}</p>}
                  {appointment.rating && <p><strong>דירוג:</strong> {'★'.repeat(appointment.rating)}</p>}
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    style={{ marginTop: '12px' }}
                  >
                    בטל תור
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

                 {/* Pending Appointments */}
         <div className="card">
           <h3 style={{ marginBottom: '20px' }}>תורים ממתינים לאישור</h3>
           {pendingAppointments.length === 0 ? (
             <p>אין תורים ממתינים לאישור</p>
           ) : (
            <div className="appointment-list">
              {pendingAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-header">
                    <h4>{appointment.serviceName}</h4>
                    <span className={`appointment-status ${getStatusClass(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                  <p><strong>תאריך:</strong> {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: he })}</p>
                  <p><strong>שעה:</strong> {appointment.time}</p>
                  {appointment.comment && <p><strong>הערה:</strong> {appointment.comment}</p>}
                  {appointment.rating && <p><strong>דירוג:</strong> {'★'.repeat(appointment.rating)}</p>}
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    style={{ marginTop: '12px' }}
                  >
                    בטל תור
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>


      </div>
    </div>
  );
};

export default CustomerDashboard;
