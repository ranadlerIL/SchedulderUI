import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockBusiness } from '../../data/mockData.ts';
import { Service } from '../../types';
import BookingModal from './BookingModal.tsx';

const CustomerHome: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleCloseBooking = () => {
    setShowBookingModal(false);
    setSelectedService(null);
  };

  const handleGalleryClick = () => {
    setShowGalleryModal(true);
  };

  const handleCloseGallery = () => {
    setShowGalleryModal(false);
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
        padding: '30px 0 20px 0',
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
               gap: '20px',
               maxWidth: '900px',
               margin: '0 auto'
             }}>
                               {/* First Line - Main Title */}
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0 16px'
                }}>
                  {/* Main Title */}
                  <h1 style={{ 
                    margin: 0, 
                    fontSize: 'clamp(20px, 5vw, 28px)',
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    letterSpacing: '1px',
                    textAlign: 'center'
                  }}>
                    <span style={{ marginLeft: '8px', fontSize: 'clamp(18px, 4vw, 24px)' }}>💅</span>
                    שיר ניילס
                    <span style={{ marginRight: '8px', fontSize: 'clamp(18px, 4vw, 24px)' }}>💅</span>
                  </h1>
                </div>

                {/* Second Line - Navigation Button */}
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0 16px'
                }}>
                  <Link to="/customer/login" style={{ 
                    color: 'white',
                    textDecoration: 'none',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease',
                    fontWeight: '500',
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    whiteSpace: 'nowrap'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    התורים שלי
                  </Link>
                </div>
               
                               {/* Second Line - Business Info Icons */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  gap: '32px',
                  padding: '0 16px',
                  flexWrap: 'wrap'
                }}>
                               <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>
                    כתובת
                  </div>
                </div>
               
                               <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>
                    טלפון
                  </div>
                </div>
               
                                                               {mockBusiness.instagramUrl && (
                   <div style={{ 
                     display: 'flex', 
                     flexDirection: 'column',
                     alignItems: 'center',
                     gap: '8px',
                     cursor: 'pointer',
                     transition: 'all 0.3s ease'
                   }} onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-2px)';
                   }} onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                   }}>
                     <div style={{
                       width: '40px',
                       height: '40px',
                       borderRadius: '50%',
                       backgroundColor: 'rgba(255, 255, 255, 0.2)',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       border: '2px solid rgba(255, 255, 255, 0.3)'
                     }}>
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                       </svg>
                     </div>
                     <div style={{ fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>
                       אינסטגרם
                     </div>
                   </div>
                 )}
                 
                 {/* WhatsApp Icon */}
                 <div style={{ 
                   display: 'flex', 
                   flexDirection: 'column',
                   alignItems: 'center',
                   gap: '8px',
                   cursor: 'pointer',
                   transition: 'all 0.3s ease'
                 }} onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-2px)';
                 }} onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                 }}>
                   <div style={{
                     width: '40px',
                     height: '40px',
                     borderRadius: '50%',
                     backgroundColor: 'rgba(255, 255, 255, 0.2)',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     border: '2px solid rgba(255, 255, 255, 0.3)'
                   }}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                     </svg>
                   </div>
                   <div style={{ fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>
                     ווטסאפ
                   </div>
                 </div>
             </div>
           </div>
          </nav>
        </div>
      </header>

                           <div className="container">

                                         {/* Gallery Section */}
                     <div className="card">
                       <div style={{ 
                         display: 'flex',
                         justifyContent: 'center',
                         marginTop: '20px'
                       }}>
                         {/* Single Gallery Card */}
                                                   <div 
                            style={{ 
                              position: 'relative',
                              cursor: 'pointer',
                              borderRadius: '16px',
                              overflow: 'hidden',
                              boxShadow: '0 8px 25px rgba(255, 107, 157, 0.3)',
                              transition: 'all 0.3s ease',
                              height: '150px',
                              width: '250px'
                            }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.transform = 'scale(1.02)';
                             e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 107, 157, 0.5)';
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.transform = 'scale(1)';
                             e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.3)';
                           }}
                           onClick={handleGalleryClick}
                         >
                           <div style={{
                             width: '100%',
                             height: '100%',
                             background: 'linear-gradient(135deg, #ff6b9d, #ff8fab, #ffb3c7)',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             color: 'white',
                             fontSize: '48px'
                           }}>
                             💅
                           </div>
                           <div style={{
                             position: 'absolute',
                             bottom: '0',
                             left: '0',
                             right: '0',
                             background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                             color: 'white',
                             padding: '20px',
                             fontSize: '18px',
                             fontWeight: '600',
                             textAlign: 'center'
                           }}>
                             גלריית עבודות
                           </div>
                         </div>
                       </div>
                     </div>

                    {/* Services */}
          <div className="card">
            <h3>
              <span style={{ marginLeft: '12px' }}>✨</span>
              השירותים שלנו
            </h3>
            <div className="service-grid">
              {mockBusiness.services.map((service) => (
                                 <div 
                   key={service.id} 
                   className="service-card" 
                   onClick={() => handleServiceSelect(service)} 
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
                   <div className="service-content" style={{ padding: '24px' }}>
                     <h4 className="service-title" style={{ fontSize: '16px', fontWeight: '600' }}>{service.name} - {service.duration} דק</h4>
                     <p className="service-price" style={{ fontSize: '16px', fontWeight: '600' }}>₪{service.price}</p>
                   </div>
                 </div>
              ))}
            </div>
          </div>

                     {/* Business Description */}
           <div className="card">
             <h3 style={{ marginBottom: '24px' }}>
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

       {/* Gallery Modal */}
       {showGalleryModal && (
         <div style={{
           position: 'fixed',
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: '100%',
              overflowY: 'auto',
              position: 'relative'
            }}>
                                                         {/* Close Button */}
                <button
                  onClick={handleCloseGallery}
                  style={{
                    position: 'fixed',
                    top: '10px',
                    right: '30px',
                    background: 'none',
                    border: 'none',
                    fontSize: '32px',
                    cursor: 'pointer',
                    color: '#ff6b9d',
                    width: 'auto',
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    zIndex: 1001,
                    fontWeight: 'bold'
                  }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.color = '#ff8fab';
                 e.currentTarget.style.transform = 'scale(1.2)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.color = '#ff6b9d';
                 e.currentTarget.style.transform = 'scale(1)';
               }}
             >
               ×
             </button>

                           

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '24px'
              }}>
                                 {/* Overall Gallery Images */}
                 {[
                   { icon: '💅', gradient: 'linear-gradient(135deg, #ff6b9d, #ff8fab)' },
                   { icon: '🦶', gradient: 'linear-gradient(135deg, #ff8fab, #ffb3c7)' },
                   { icon: '💎', gradient: 'linear-gradient(135deg, #ffb3c7, #ffd1dc)' },
                   { icon: '💅', gradient: 'linear-gradient(135deg, #ffd1dc, #ffeef2)' },
                   { icon: '🦶', gradient: 'linear-gradient(135deg, #ff6b9d, #ffb3c7)' },
                   { icon: '💎', gradient: 'linear-gradient(135deg, #ff8fab, #ffd1dc)' },
                   { icon: '💅', gradient: 'linear-gradient(135deg, #ffb3c7, #ffeef2)' },
                   { icon: '🦶', gradient: 'linear-gradient(135deg, #ff6b9d, #ff8fab)' },
                   { icon: '💎', gradient: 'linear-gradient(135deg, #ff8fab, #ffb3c7)' },
                   { icon: '💅', gradient: 'linear-gradient(135deg, #ffb3c7, #ffd1dc)' },
                   { icon: '🦶', gradient: 'linear-gradient(135deg, #ffd1dc, #ffeef2)' },
                   { icon: '💎', gradient: 'linear-gradient(135deg, #ff6b9d, #ffb3c7)' }
                 ].map((item, index) => (
                   <div
                     key={index}
                     style={{
                       position: 'relative',
                       borderRadius: '12px',
                       overflow: 'hidden',
                       boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
                       transition: 'all 0.3s ease',
                       cursor: 'pointer',
                       height: '200px'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'scale(1.02)';
                       e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.5)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'scale(1)';
                       e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.3)';
                     }}
                   >
                     <div style={{
                       width: '100%',
                       height: '100%',
                       background: item.gradient,
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       color: 'white',
                       fontSize: '48px'
                     }}>
                       {item.icon}
                     </div>
                   </div>
                 ))}
              </div>

             
           </div>
         </div>
       )}
    </div>
  );
};

export default CustomerHome;
