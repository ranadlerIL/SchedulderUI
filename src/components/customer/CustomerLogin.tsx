import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockAuthCodes } from '../../data/mockData.ts';

const CustomerLogin: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError('אנא הכנס מספר טלפון');
      return;
    }

    // Simulate sending WhatsApp verification code
    setShowVerification(true);
    setError('');
    const defaultCode = '123456';
    const codeToShow = mockAuthCodes[phone] || defaultCode;
    alert(`קוד אימות נשלח לווטסאפ: ${phone}\nקוד לדוגמה: ${codeToShow}`);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode) {
      setError('אנא הכנס קוד אימות');
      return;
    }

    const expectedCode = mockAuthCodes[phone] || '123456'; // Default code for any phone number
    if (verificationCode === expectedCode) {
      // In a real app, this would set authentication state
      localStorage.setItem('customerPhone', phone);
      navigate('/customer/dashboard');
    } else {
      setError('קוד אימות שגוי');
    }
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <h1>התחברות לקוחות</h1>
            <ul className="nav-links">
              <li><a href="/">חזרה לדף הבית</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
          <h2>התחברות לקוחות</h2>
          <p>התחבר באמצעות מספר הטלפון שלך</p>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {!showVerification ? (
            <form onSubmit={handleSendCode}>
              <div className="form-group">
                <label>מספר טלפון</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="050-1234567"
                  required
                  style={{
                    textAlign: 'right',
                    direction: 'rtl',
                    color: '#495057'
                  }}
                />
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                שלח קוד אימות לווטסאפ
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode}>
              <div className="form-group">
                <label>קוד אימות</label>
                <input
                  type="text"
                  className="form-control"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  required
                  style={{
                    textAlign: 'right',
                    direction: 'rtl',
                    color: '#495057'
                  }}
                />
                <small style={{ color: '#6c757d', marginTop: '8px', display: 'block' }}>
                  קוד אימות נשלח לווטסאפ שלך
                  <br />
                  <span style={{ color: '#ff6b9d', fontWeight: '600' }}>
                    קוד לדוגמה: {mockAuthCodes[phone] || '123456'}
                  </span>
                </small>
              </div>
              
                             <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                 אימות והתחברות
               </button>
            </form>
          )}

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p>אין לך חשבון?</p>
            <p>התחברות מתבצעת אוטומטית עם מספר הטלפון שלך</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
