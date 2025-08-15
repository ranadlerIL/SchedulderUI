import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockBusiness } from '../../data/mockData.ts';
import { Service } from '../../types';
import BookingModal from './BookingModal.tsx';

const CustomerHome: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleCloseBooking = () => {
    setShowBookingModal(false);
    setSelectedService(null);
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
      {/* Beautiful Pink Header */}
      <header className="header" style={{ 
        background: 'linear-gradient(135deg, #ff6b9d, #ff8fab, #ffb3c7)',
        color: 'white',
        padding: '40px 0 30px 0',
        boxShadow: '0 4px 20px rgba(255, 107, 157, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          transform: 'rotate(45deg)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%'
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <nav className="nav" style={{ textAlign: 'center' }}>
                         {/* Two-Line Layout Container */}
             <div style={{ 
               display: 'flex',
               flexDirection: 'column',
               gap: '32px',
               maxWidth: '900px',
               margin: '0 auto'
             }}>
               {/* First Line - Main Title, Welcome Message and Navigation Links */}
               <div style={{ 
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 gap: '32px',
                 flexWrap: 'wrap'
               }}>
                 {/* Main Title */}
                 <h1 style={{ 
                   margin: 0, 
                   fontSize: '28px',
                   fontWeight: 'bold',
                   textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                   letterSpacing: '1px'
                 }}>
                   <span style={{ marginLeft: '12px', fontSize: '24px' }}>💅</span>
                   {mockBusiness.name}
                   <span style={{ marginRight: '12px', fontSize: '24px' }}>💅</span>
                 </h1>
                 
                 {/* Welcome Message */}
                 <p style={{ 
                   fontSize: '16px', 
                   margin: 0,
                   opacity: 0.95,
                   fontWeight: '300'
                 }}>
                   ברוכים הבאים! ✨
                 </p>
                 
                 {/* Navigation Links */}
                 <div style={{ 
                   display: 'flex',
                   gap: '16px'
                 }}>
                 <Link to="/customer/login" style={{ 
                   color: 'white',
                   textDecoration: 'none',
                   padding: '12px 24px',
                   borderRadius: '25px',
                   backgroundColor: 'rgba(255, 255, 255, 0.15)',
                   border: '1px solid rgba(255, 255, 255, 0.3)',
                   transition: 'all 0.3s ease',
                   fontWeight: '500'
                 }} onMouseEnter={(e) => {
                   e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                   e.currentTarget.style.transform = 'translateY(-2px)';
                 }} onMouseLeave={(e) => {
                   e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                   e.currentTarget.style.transform = 'translateY(0)';
                 }}>
                   התחברות לקוחות
                 </Link>
                 <Link to="/business/login" style={{ 
                   color: 'white',
                   textDecoration: 'none',
                   padding: '12px 24px',
                   borderRadius: '25px',
                   backgroundColor: 'rgba(255, 255, 255, 0.15)',
                   border: '1px solid rgba(255, 255, 255, 0.3)',
                   transition: 'all 0.3s ease',
                   fontWeight: '500'
                 }} onMouseEnter={(e) => {
                   e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                   e.currentTarget.style.transform = 'translateY(-2px)';
                 }} onMouseLeave={(e) => {
                   e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                   e.currentTarget.style.transform = 'translateY(0)';
                                    }}>
                     התחברות עסק
                   </Link>
                 </div>
               </div>
               
               {/* Second Line - Business Info Cards (All 3 cards) */}
               <div style={{ 
                 display: 'grid', 
                 gridTemplateColumns: 'repeat(3, 1fr)', 
                 gap: '20px'
               }}>
               <div style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'flex-start',
                 gap: '16px',
                 padding: '20px',
                 backgroundColor: 'rgba(255, 255, 255, 0.15)',
                 borderRadius: '16px',
                 backdropFilter: 'blur(10px)',
                 border: '1px solid rgba(255, 255, 255, 0.2)',
                 transition: 'all 0.3s ease',
                 cursor: 'pointer'
               }} onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-2px)';
                 e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
               }} onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
               }}>
                 <div style={{
                   width: '50px',
                   height: '50px',
                   borderRadius: '50%',
                   backgroundColor: 'rgba(255, 255, 255, 0.2)',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center'
                 }}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                   </svg>
                 </div>
                 <div style={{ fontSize: '16px', textAlign: 'right' }}>
                   <strong style={{ display: 'block', marginBottom: '4px' }}>כתובת</strong>
                   {mockBusiness.address}
                 </div>
               </div>
               
               <div style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'flex-start',
                 gap: '16px',
                 padding: '20px',
                 backgroundColor: 'rgba(255, 255, 255, 0.15)',
                 borderRadius: '16px',
                 backdropFilter: 'blur(10px)',
                 border: '1px solid rgba(255, 255, 255, 0.2)',
                 transition: 'all 0.3s ease',
                 cursor: 'pointer'
               }} onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-2px)';
                 e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
               }} onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
               }}>
                 <div style={{
                   width: '50px',
                   height: '50px',
                   borderRadius: '50%',
                   backgroundColor: 'rgba(255, 255, 255, 0.2)',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center'
                 }}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                   </svg>
                 </div>
                 <div style={{ fontSize: '16px', textAlign: 'right' }}>
                   <strong style={{ display: 'block', marginBottom: '4px' }}>טלפון</strong>
                   {mockBusiness.phone}
                 </div>
               </div>
               
               {mockBusiness.instagramUrl && (
                 <div style={{ 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'flex-start',
                   gap: '16px',
                   padding: '20px',
                   backgroundColor: 'rgba(255, 255, 255, 0.15)',
                   borderRadius: '16px',
                   backdropFilter: 'blur(10px)',
                   border: '1px solid rgba(255, 255, 255, 0.2)',
                   transition: 'all 0.3s ease',
                   cursor: 'pointer'
                 }} onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-2px)';
                   e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                 }} onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                 }}>
                   <div style={{
                     width: '50px',
                     height: '50px',
                     borderRadius: '50%',
                     backgroundColor: 'rgba(255, 255, 255, 0.2)',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center'
                   }}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                     </svg>
                   </div>
                   <div style={{ fontSize: '16px', textAlign: 'right' }}>
                     <strong style={{ display: 'block', marginBottom: '4px' }}>אינסטגרם</strong>
                     <a 
                       href={mockBusiness.instagramUrl} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style={{ 
                         color: 'white', 
                         textDecoration: 'none',
                         fontWeight: 'bold',
                         borderBottom: '1px solid rgba(255,255,255,0.5)',
                         transition: 'all 0.3s ease'
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.borderBottomColor = 'white';
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.5)';
                       }}
                     >
                       עקבו אחרינו
                     </a>
                   </div>
                 </div>
               )}
             </div>
           </div>
          </nav>
        </div>
      </header>

             <div className="container">

                   {/* Services */}
          <div className="card">
            <h3>
              <span style={{ marginLeft: '12px' }}>✨</span>
              השירותים שלנו
            </h3>
            <div className="service-grid">
              {mockBusiness.services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-content" style={{ padding: '24px' }}>
                    <h4 className="service-title">{service.name}</h4>
                    <p className="service-price">₪{service.price}</p>
                    <p className="service-duration">משך הטיפול: {service.duration} דקות</p>
                    {service.description && (
                      <p style={{ color: '#6c757d', fontSize: '14px' }}>{service.description}</p>
                    )}
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleServiceSelect(service)}
                      style={{ width: '100%', marginTop: '16px' }}
                    >
                      הזמן תור
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Description */}
          <div className="card">
            <h3>
              <span style={{ marginLeft: '12px' }}>🏪</span>
              אודות העסק
            </h3>
            <div style={{ 
              padding: '24px',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              lineHeight: '1.6'
            }}>
              <p style={{ 
                fontSize: '16px', 
                color: '#495057',
                margin: '0 0 16px 0'
              }}>
                ברוכים הבאים ל"יופי של ציפורניים" - המקום שלכם לטיפוח ציפורניים מקצועי ואיכותי!
              </p>
              <p style={{ 
                fontSize: '16px', 
                color: '#495057',
                margin: '0 0 16px 0'
              }}>
                אנו מתמחים במגוון רחב של טיפולי ציפורניים הכוללים בניית ציפורניים, עיצוב ציפורניים, טיפולי פדיקור ומניקור מקצועיים. הצוות המקצועי שלנו מבטיח לכם חוויה נעימה ואיכותית עם תוצאות מדהימות.
              </p>
              <p style={{ 
                fontSize: '16px', 
                color: '#495057',
                margin: 0
              }}>
                השתמשו במערכת ההזמנות שלנו כדי לתאם תור בקלות ובנוחות. אנו מחכים לכם!
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="card">
            <h3>
              <span style={{ marginLeft: '12px' }}>💬</span>
              חוות דעת לקוחות
            </h3>
            <div style={{ 
              display: 'grid',
              gap: '20px',
              marginTop: '20px'
            }}>
              {/* Comment 1 */}
              <div style={{ 
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #e9ecef',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#ff6b9d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    marginLeft: '12px'
                  }}>
                    ש
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '16px' }}>שירה כהן</strong>
                    <div style={{ color: '#ffc107', fontSize: '14px' }}>⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p style={{ 
                  fontSize: '15px',
                  color: '#495057',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  חוויה מדהימה! הציפורניים יצאו מושלמות והשירות היה מקצועי ונעים. בהחלט אחזור שוב!
                </p>
              </div>

              {/* Comment 2 */}
              <div style={{ 
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #e9ecef',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#ff8fab',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    marginLeft: '12px'
                  }}>
                    מ
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '16px' }}>מיכל לוי</strong>
                    <div style={{ color: '#ffc107', fontSize: '14px' }}>⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p style={{ 
                  fontSize: '15px',
                  color: '#495057',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  טיפול מקצועי ואיכותי. הציפורניים נשארו יפות שבועיים אחרי הטיפול. ממליצה בחום!
                </p>
              </div>

              {/* Comment 3 */}
              <div style={{ 
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #e9ecef',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#ffb3c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    marginLeft: '12px'
                  }}>
                    נ
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '16px' }}>נועה גולדברג</strong>
                    <div style={{ color: '#ffc107', fontSize: '14px' }}>⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p style={{ 
                  fontSize: '15px',
                  color: '#495057',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  שירות מעולה! הצוות אדיב ומקצועי, והתוצאה מדהימה. כבר הזמנתי תור נוסף!
                </p>
              </div>
            </div>
          </div>

                   
       </div>

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <BookingModal 
          service={selectedService}
          business={mockBusiness}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
};

export default CustomerHome;
