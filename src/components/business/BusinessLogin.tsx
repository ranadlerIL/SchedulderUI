import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockAuthCodes } from '../../data/mockData.ts';

const BusinessLogin: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('אנא מלא את כל השדות');
      return;
    }

    // Simulate email verification
    setShowVerification(true);
    setError('');
    alert(`קוד אימות נשלח לאימייל: ${identifier}\nקוד לדוגמה: ${mockAuthCodes[identifier] || '999999'}`);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode) {
      setError('אנא הכנס קוד אימות');
      return;
    }

    const expectedCode = mockAuthCodes[identifier] || '999999'; // Default code for any identifier
    if (verificationCode === expectedCode) {
      // In a real app, this would set authentication state
      localStorage.setItem('businessEmail', identifier);
      navigate('/business/dashboard');
    } else {
      setError('קוד אימות שגוי');
    }
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <h1>התחברות עסק</h1>
            <ul className="nav-links">
              <li><a href="/">חזרה לדף הבית</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
          <h2>התחברות עסק</h2>
          <p>התחבר עם האימייל או הטלפון שלך</p>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {!showVerification ? (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>שיטת התחברות</label>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="radio"
                      name="loginMethod"
                      value="email"
                      checked={loginMethod === 'email'}
                      onChange={() => setLoginMethod('email')}
                    />
                    אימייל
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="radio"
                      name="loginMethod"
                      value="phone"
                      checked={loginMethod === 'phone'}
                      onChange={() => setLoginMethod('phone')}
                    />
                    טלפון
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>{loginMethod === 'email' ? 'אימייל' : 'מספר טלפון'}</label>
                <input
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  className="form-control"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={loginMethod === 'email' ? 'example@email.com' : '050-1234567'}
                  required
                />
              </div>

              <div className="form-group">
                <label>סיסמה</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                התחבר
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
                  placeholder="999999"
                  maxLength={6}
                  required
                />
                <small style={{ color: '#6c757d', marginTop: '8px', display: 'block' }}>
                  קוד אימות נשלח לאימייל שלך
                  <br />
                  <span style={{ color: '#ff6b9d', fontWeight: '600' }}>
                    קוד לדוגמה: {mockAuthCodes[identifier] || '999999'}
                  </span>
                </small>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                אימות והתחברות
              </button>
              
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ width: '100%', marginTop: '12px' }}
                onClick={() => {
                  setShowVerification(false);
                  setVerificationCode('');
                  setError('');
                }}
              >
                חזור
              </button>
            </form>
          )}

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p>אין לך חשבון עסק?</p>
            <Link to="/business/signup" className="btn btn-secondary" style={{ width: '100%' }}>
              הרשמת עסק חדש
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLogin;
