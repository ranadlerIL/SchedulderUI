import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { he } from 'date-fns/locale';
import { Appointment, Business, Service } from '../../types';
import { mockBusiness, mockAppointments } from '../../data/mockData.ts';

const BusinessDashboard: React.FC = () => {
  const [businessEmail, setBusinessEmail] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('businessEmail');
    if (!email) {
      navigate('/business/login');
      return;
    }
    
    setBusinessEmail(email);
    setAppointments(mockAppointments);
    setFilteredAppointments(mockAppointments);
  }, [navigate]);

  useEffect(() => {
    if (!startDate && !endDate) {
      setFilteredAppointments(appointments);
      return;
    }

    const filtered = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);

      if (startDate && endDate) {
        return appointmentDate >= startDate && appointmentDate <= endDate;
      } else if (startDate) {
        return appointmentDate >= startDate;
      } else if (endDate) {
        return appointmentDate <= endDate;
      }
      return true;
    });

    setFilteredAppointments(filtered);
  }, [appointments, startDate, endDate]);

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

  const approvedAppointments = filteredAppointments.filter(apt => apt.status === 'approved');
  const pendingAppointments = filteredAppointments.filter(apt => apt.status !== 'approved');

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  };

  const getDayName = (day: string) => {
    const days: { [key: string]: string } = {
      'א': 'א',
      'ב': 'ב', 
      'ג': 'ג',
      'ד': 'ד',
      'ה': 'ה',
      'ו': 'ו',
      'ש': 'ש'
    };
    return days[day] || day;
  };

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date >= startDate) {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(startDate);
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!startDate && !endDate) return false;
    if (startDate && endDate) {
      return date >= startDate && date <= endDate;
    }
    if (startDate) {
      return isSameDay(date, startDate);
    }
    return false;
  };

  const isDateSelected = (date: Date) => {
    return (startDate && isSameDay(date, startDate)) || (endDate && isSameDay(date, endDate));
  };

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

        {/* Calendar Search Section */}
        <div className="card">
          <h3 style={{ marginBottom: '24px' }}>
            <span style={{ marginLeft: '8px' }}>📅</span>
            חיפוש תורים לפי תאריך
          </h3>
          
          {/* Date Range Display */}
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '20px',
            padding: '12px 16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#495057' }}>טווח תאריכים:</span>
              <span style={{ fontSize: '14px', color: '#6c757d' }}>
                {startDate ? format(startDate, 'dd/MM/yyyy', { locale: he }) : 'לא נבחר'}
              </span>
              <span style={{ fontSize: '14px', color: '#6c757d' }}>-</span>
              <span style={{ fontSize: '14px', color: '#6c757d' }}>
                {endDate ? format(endDate, 'dd/MM/yyyy', { locale: he }) : 'לא נבחר'}
              </span>
            </div>
            <button
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5a6268';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#6c757d';
              }}
            >
              נקה
            </button>
          </div>

          {/* Calendar */}
          <div style={{
            border: '2px solid #e9ecef',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: 'white'
          }}>
            {/* Calendar Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              backgroundColor: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
              background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
              color: 'white'
            }}>
                             <button
                 onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                 style={{
                   background: 'none',
                   border: 'none',
                   color: 'white',
                   fontSize: '18px',
                   cursor: 'pointer',
                   padding: '8px',
                   borderRadius: '4px',
                   transition: 'all 0.3s ease'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.backgroundColor = 'transparent';
                 }}
               >
                 →
               </button>
               <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                 {format(currentMonth, 'MMMM yyyy', { locale: he })}
               </h4>
               <button
                 onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                 style={{
                   background: 'none',
                   border: 'none',
                   color: 'white',
                   fontSize: '18px',
                   cursor: 'pointer',
                   padding: '8px',
                   borderRadius: '4px',
                   transition: 'all 0.3s ease'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.backgroundColor = 'transparent';
                 }}
               >
                 ←
               </button>
            </div>

            {/* Calendar Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '1px',
              backgroundColor: '#e9ecef'
            }}>
              {/* Day Headers */}
              {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map((day) => (
                <div
                  key={day}
                  style={{
                    padding: '12px 8px',
                    backgroundColor: '#f8f9fa',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#495057',
                    borderBottom: '1px solid #e9ecef'
                  }}
                >
                  {getDayName(day)}
                </div>
              ))}

              {/* Calendar Days */}
              {getDaysInMonth(currentMonth).map((date, index) => (
                <div
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  style={{
                    padding: '12px 8px',
                    backgroundColor: isDateInRange(date) ? '#ff6b9d' : 'white',
                    color: isDateInRange(date) ? 'white' : '#495057',
                    textAlign: 'center',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isDateSelected(date) ? '2px solid #ff6b9d' : '1px solid #e9ecef',
                    fontWeight: isDateSelected(date) ? '600' : '400',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isDateInRange(date)) {
                      e.currentTarget.style.backgroundColor = '#fff5f7';
                      e.currentTarget.style.color = '#ff6b9d';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isDateInRange(date)) {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = '#495057';
                    }
                  }}
                >
                  {format(date, 'd')}
                </div>
              ))}
            </div>
          </div>

          {/* Search Results */}
          {(startDate || endDate) && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              border: '1px solid #bbdefb'
            }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#1976d2' }}>
                <strong>תוצאות חיפוש:</strong> {filteredAppointments.length} תורים נמצאו
                {startDate && ` מתאריך ${format(startDate, 'dd/MM/yyyy', { locale: he })}`}
                {endDate && ` עד תאריך ${format(endDate, 'dd/MM/yyyy', { locale: he })}`}
              </p>
            </div>
          )}
        </div>

        {/* Business Actions */}
        <div className="card">
                     <h3 style={{ marginBottom: '32px' }}>ניהול עסק</h3>
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
                     <h3 style={{ marginBottom: '32px' }}>תורים מאושרים</h3>
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
                  {appointment.comment && <p><strong>הערה:</strong> דרישות של לקוחות</p>}
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
                     <h3 style={{ marginBottom: '32px' }}>תורים ממתינים לאישור</h3>
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
                  {appointment.comment && <p><strong>הערה:</strong> דרישות של לקוחות</p>}
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
                     <h3 style={{ marginBottom: '32px' }}>ניהול שירותים</h3>
          <div className="service-grid">
                         {mockBusiness.services.map((service) => (
                              <div 
                 key={service.id} 
                 className="service-card" 
                 onClick={() => alert('בגרסה זו לא ניתן לערוך שירותים')} 
                 style={{ 
                   cursor: 'pointer',
                   transition: 'all 0.3s ease',
                   transform: 'scale(1)',
                   boxShadow: '0 4px 15px rgba(255, 107, 157, 0.2)',
                   border: '2px solid transparent',
                   background: 'linear-gradient(135deg, #fff, #fff5f7)'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'scale(1.05)';
                   e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.4)';
                   e.currentTarget.style.border = '2px solid #ff6b9d';
                   e.currentTarget.style.background = 'linear-gradient(135deg, #fff5f7, #ffeef2)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'scale(1)';
                   e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.2)';
                   e.currentTarget.style.border = '2px solid transparent';
                   e.currentTarget.style.background = 'linear-gradient(135deg, #fff, #fff5f7)';
                 }}
                 onMouseDown={(e) => {
                   e.currentTarget.style.transform = 'scale(0.95)';
                   e.currentTarget.style.boxShadow = '0 2px 10px rgba(255, 107, 157, 0.6)';
                   e.currentTarget.style.background = 'linear-gradient(135deg, #ff6b9d, #ff8fab)';
                   e.currentTarget.style.color = 'white';
                 }}
                 onMouseUp={(e) => {
                   e.currentTarget.style.transform = 'scale(1.05)';
                   e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.4)';
                   e.currentTarget.style.background = 'linear-gradient(135deg, #fff5f7, #ffeef2)';
                   e.currentTarget.style.color = 'inherit';
                 }}
               >
                                   <div className="service-content" style={{ padding: '16px' }}>
                    <h4 className="service-title" style={{ fontSize: '14px', fontWeight: '600' }}>{service.name} - {service.duration} דק</h4>
                    <p className="service-price" style={{ fontSize: '14px', fontWeight: '600' }}>₪{service.price}</p>
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
