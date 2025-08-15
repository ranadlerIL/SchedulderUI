import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Business, Service, WorkingHours } from '../../types';

const BusinessSignup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    instagramUrl: ''
  });

  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    sunday: { start: '09:00', end: '18:00', isOpen: true },
    monday: { start: '09:00', end: '18:00', isOpen: true },
    tuesday: { start: '09:00', end: '18:00', isOpen: true },
    wednesday: { start: '09:00', end: '18:00', isOpen: true },
    thursday: { start: '09:00', end: '18:00', isOpen: true },
    friday: { start: '09:00', end: '16:00', isOpen: true },
    saturday: { start: '10:00', end: '16:00', isOpen: true }
  });

  const [services, setServices] = useState<Service[]>([
    { id: '1', name: '', price: 0, duration: 30 }
  ]);

  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWorkingHoursChange = (day: keyof WorkingHours, field: 'start' | 'end' | 'isOpen', value: string | boolean) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleServiceChange = (index: number, field: keyof Service, value: string | number) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: field === 'price' || field === 'duration' ? Number(value) : value
    };
    setServices(updatedServices);
  };

  const addService = () => {
    setServices(prev => [...prev, {
      id: (prev.length + 1).toString(),
      name: '',
      price: 0,
      duration: 30
    }]);
  };

  const removeService = (index: number) => {
    if (services.length > 1) {
      setServices(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.address) {
      setError('אנא מלא את כל השדות הנדרשים');
      return;
    }

    if (services.some(service => !service.name || service.price <= 0)) {
      setError('אנא מלא את כל פרטי השירותים');
      return;
    }

    // In a real app, this would send the data to the backend
    alert('העסק נרשם בהצלחה! תקבל אימייל לאישור החשבון.');
    navigate('/business/login');
  };

  const getDayName = (day: string) => {
    const days: { [key: string]: string } = {
      sunday: 'ראשון',
      monday: 'שני',
      tuesday: 'שלישי',
      wednesday: 'רביעי',
      thursday: 'חמישי',
      friday: 'שישי',
      saturday: 'שבת'
    };
    return days[day] || day;
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <h1>הרשמת עסק</h1>
            <ul className="nav-links">
              <li><a href="/">חזרה לדף הבית</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="card">
          <h2>הרשמת עסק חדש</h2>
          <p>מלא את הפרטים להרשמת העסק שלך</p>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <h3>פרטי העסק</h3>
            <div className="form-group">
              <label>שם העסק *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>אימייל *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>מספר טלפון *</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>סיסמה *</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>כתובת *</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>קישור לאינסטגרם (אופציונלי)</label>
              <input
                type="url"
                name="instagramUrl"
                className="form-control"
                value={formData.instagramUrl}
                onChange={handleInputChange}
              />
            </div>

            {/* Working Hours */}
            <h3>שעות פעילות</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {Object.entries(workingHours).map(([day, hours]) => (
                <div key={day} className="card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <input
                      type="checkbox"
                      checked={hours.isOpen}
                      onChange={(e) => handleWorkingHoursChange(day as keyof WorkingHours, 'isOpen', e.target.checked)}
                      style={{ marginLeft: '8px' }}
                    />
                    <label style={{ margin: 0, fontWeight: 'bold' }}>{getDayName(day)}</label>
                  </div>
                  
                  {hours.isOpen && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="time"
                        value={hours.start}
                        onChange={(e) => handleWorkingHoursChange(day as keyof WorkingHours, 'start', e.target.value)}
                        className="form-control"
                        style={{ flex: 1 }}
                      />
                      <span>עד</span>
                      <input
                        type="time"
                        value={hours.end}
                        onChange={(e) => handleWorkingHoursChange(day as keyof WorkingHours, 'end', e.target.value)}
                        className="form-control"
                        style={{ flex: 1 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Services */}
            <h3>שירותים</h3>
            {services.map((service, index) => (
              <div key={service.id} className="card" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4>שירות {index + 1}</h4>
                  {services.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeService(index)}
                    >
                      מחק שירות
                    </button>
                  )}
                </div>
                
                <div className="form-group">
                  <label>שם השירות *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={service.name}
                    onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                    required
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>מחיר (₪) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={service.price}
                      onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>משך בדקות *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={service.duration}
                      onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
                      min="5"
                      step="5"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addService}
              style={{ marginBottom: '24px' }}
            >
              הוסף שירות
            </button>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              הרשמת עסק
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignup;
