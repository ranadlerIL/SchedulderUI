import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { Appointment, Business, Service } from '../../types';
import { mockBusiness, mockAppointments } from '../../data/mockData.ts';

const BusinessDashboard: React.FC = () => {
  const [businessEmail, setBusinessEmail] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('businessEmail');
    if (!email) {
      navigate('/business/login');
      return;
    }
    
    setBusinessEmail(email);
    setAppointments(mockAppointments);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('businessEmail');
    navigate('/');
  };

  const handleApproveAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'approved' as const } : apt
    ));
    alert('התור אושר בהצלחה');
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את התור?')) {
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      alert('התור נמחק בהצלחה');
    }
  };

  const handleDeleteBusiness = () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את העסק? פעולה זו אינה הפיכה.')) {
      localStorage.removeItem('businessEmail');
      alert('העסק נמחק בהצלחה');
      navigate('/');
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
            <h1>לוח בקרה - עסק</h1>
            <ul className="nav-links">
              <li><a href="/">חזרה לדף הבית</a></li>
              <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>התנתק</button></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="card">
          <h2>ברוך הבא, {mockBusiness.name}!</h2>
          <p>אימייל: {businessEmail}</p>
          <p>כתובת: {mockBusiness.address}</p>
          <p>טלפון: {mockBusiness.phone}</p>
        </div>

        {/* Business Actions */}
        <div className="card">
          <h3>ניהול עסק</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => setShowEditModal(true)}
            >
              ערוך פרטי עסק
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => setShowDeleteConfirm(true)}
            >
              מחק עסק
            </button>
          </div>
        </div>

        {/* Approved Appointments */}
        <div className="card">
          <h3>תורים מאושרים</h3>
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
                  <p><strong>לקוח:</strong> {appointment.customerName}</p>
                  <p><strong>טלפון:</strong> {appointment.customerPhone}</p>
                  <p><strong>תאריך:</strong> {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: he })}</p>
                  <p><strong>שעה:</strong> {appointment.time}</p>
                  {appointment.comment && <p><strong>הערה:</strong> {appointment.comment}</p>}
                  {appointment.rating && <p><strong>דירוג:</strong> {'★'.repeat(appointment.rating)}</p>}
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    style={{ marginTop: '12px' }}
                  >
                    מחק תור
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Appointments */}
        <div className="card">
          <h3>תורים ממתינים לאישור</h3>
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
                  <p><strong>לקוח:</strong> {appointment.customerName}</p>
                  <p><strong>טלפון:</strong> {appointment.customerPhone}</p>
                  <p><strong>תאריך:</strong> {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: he })}</p>
                  <p><strong>שעה:</strong> {appointment.time}</p>
                  {appointment.comment && <p><strong>הערה:</strong> {appointment.comment}</p>}
                  {appointment.rating && <p><strong>דירוג:</strong> {'★'.repeat(appointment.rating)}</p>}
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button 
                      className="btn btn-success" 
                      onClick={() => handleApproveAppointment(appointment.id)}
                    >
                      אשר תור
                    </button>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      מחק תור
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Services Management */}
        <div className="card">
          <h3>ניהול שירותים</h3>
          <div className="service-grid">
            {mockBusiness.services.map((service) => (
              <div key={service.id} className="service-card">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="service-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.background = 'linear-gradient(45deg, #ff6b9d, #ff8fab)';
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                    target.style.color = 'white';
                    target.style.fontSize = '24px';
                    target.textContent = '💅';
                  }}
                />
                <div className="service-content">
                  <h4 className="service-title">{service.name}</h4>
                  <p className="service-price">₪{service.price}</p>
                  <p className="service-duration">משך הטיפול: {service.duration} דקות</p>
                  <button 
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '16px' }}
                    onClick={() => alert('בגרסה זו לא ניתן לערוך שירותים')}
                  >
                    ערוך שירות
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Business Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3>ערוך פרטי עסק</h3>
            <p>בגרסה זו לא ניתן לערוך פרטי עסק</p>
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowEditModal(false)}
              style={{ width: '100%', marginTop: '16px' }}
            >
              סגור
            </button>
          </div>
        </div>
      )}

      {/* Delete Business Confirmation */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center'
          }}>
            <h3>מחיקת עסק</h3>
            <p>האם אתה בטוח שברצונך למחוק את העסק?</p>
            <p style={{ color: '#dc3545', fontWeight: 'bold' }}>פעולה זו אינה הפיכה!</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowDeleteConfirm(false)}
                style={{ flex: 1 }}
              >
                ביטול
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleDeleteBusiness}
                style={{ flex: 1 }}
              >
                מחק עסק
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessDashboard;
