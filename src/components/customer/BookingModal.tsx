import React, { useState, useEffect } from 'react';
import { format, addDays, startOfDay, isSameDay, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay, isSameMonth } from 'date-fns';
import { he } from 'date-fns/locale';
import { Service, Business, BookingStep, TimeSlot } from '../../types';
import { mockAppointments } from '../../data/mockData.ts';

interface BookingModalProps {
  service: Service;
  business: Business;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ service, business, onClose }) => {
  const [bookingStep, setBookingStep] = useState<BookingStep>({
    step: 'date',
    selectedService: service
  });
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const now = new Date();
    // Start with current month, but ensure we're not showing past months
    return now;
  });
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [comment, setComment] = useState('');
  const [conflictWarning, setConflictWarning] = useState<string>('');

  // Generate available dates for the current month
  useEffect(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const allDaysInMonth = eachDayOfInterval({ start, end });
    
    const dates: Date[] = [];
    allDaysInMonth.forEach(date => {
      // Use English day names to match the workingHours keys
      const dayName = format(date, 'EEEE').toLowerCase();
      const workingDay = business.workingHours[dayName as keyof typeof business.workingHours];
      
      if (workingDay && workingDay.isOpen) {
        dates.push(date);
      }
    });
    
    // Fallback: if no dates found, add some default dates
    if (dates.length === 0) {
      for (let i = 0; i < 7; i++) {
        dates.push(addDays(start, i));
      }
    }
    
    console.log('Available dates generated for month:', format(currentMonth, 'MMMM yyyy'), dates.length, dates);
    setAvailableDates(dates);
  }, [currentMonth, business.workingHours]);

  // Generate time slots for selected date
  useEffect(() => {
    if (!selectedDate) return;

    const dayName = format(selectedDate, 'EEEE').toLowerCase();
    const workingDay = business.workingHours[dayName as keyof typeof business.workingHours];
    
    if (!workingDay || !workingDay.isOpen) return;

    const slots: TimeSlot[] = [];
    const startTime = new Date(`2000-01-01T${workingDay.start}`);
    const endTime = new Date(`2000-01-01T${workingDay.end}`);
    
         // Generate 15-minute intervals
     for (let time = new Date(startTime); time < endTime; time.setMinutes(time.getMinutes() + 15)) {
      const timeString = format(time, 'HH:mm');
      const slotEnd = new Date(time);
      slotEnd.setMinutes(slotEnd.getMinutes() + service.duration);
      
      // Check for conflicts with existing appointments
      const conflictingAppointments = mockAppointments.filter(apt => {
        if (apt.date !== format(selectedDate, 'yyyy-MM-dd')) return false;
        
        const aptStart = new Date(`2000-01-01T${apt.time}`);
        const aptEnd = new Date(aptStart);
        aptEnd.setMinutes(aptEnd.getMinutes() + 90); // Assume 90 min for existing appointments
        
        return (time < aptEnd && slotEnd > aptStart);
      });

      slots.push({
        time: timeString,
        available: conflictingAppointments.length < 2,
        conflicts: conflictingAppointments.length
      });
    }
    
    setTimeSlots(slots);
  }, [selectedDate, service.duration, business.workingHours]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setBookingStep(prev => ({ ...prev, step: 'time', selectedDate: format(date, 'yyyy-MM-dd') }));
    setSelectedTime('');
    setConflictWarning('');
  };

  const handleTimeSelect = (time: string, conflicts: number) => {
    setSelectedTime(time);
    
    if (conflicts === 1) {
      setConflictWarning('שים לב: יש תור נוסף בשעה זו. תוכל להמשיך ולהיכנס לרשימת המתנה.');
    } else if (conflicts >= 2) {
      setConflictWarning('לא ניתן להזמין תור בשעה זו - יש יותר מדי תורים חופפים.');
      return;
    } else {
      setConflictWarning('');
    }
    
    setBookingStep(prev => ({ ...prev, step: 'details', selectedTime: time }));
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    
    setBookingStep(prev => ({ 
      ...prev, 
      step: 'confirmation',
      customerName,
      customerPhone,
      comment
    }));
  };

  const handleConfirmBooking = () => {
    // In a real app, this would send the booking to the backend
    alert('התור שלך נשמר בהצלחה! תקבל אישור בקרוב.');
    onClose();
  };

  const handleBack = () => {
    if (bookingStep.step === 'time') {
      setBookingStep(prev => ({ ...prev, step: 'date' }));
      setSelectedDate(null);
    } else if (bookingStep.step === 'details') {
      setBookingStep(prev => ({ ...prev, step: 'time' }));
      setSelectedTime('');
      setConflictWarning('');
    } else if (bookingStep.step === 'confirmation') {
      setBookingStep(prev => ({ ...prev, step: 'details' }));
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

           const renderDateSelection = () => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        const allDaysInMonth = eachDayOfInterval({ start, end });
        
        // Get the first day of the month to determine padding
        const firstDayOfMonth = getDay(start);
        const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);
        
        // Create calendar grid with padding and actual days
        const calendarDays = [...paddingDays, ...allDaysInMonth];
        
        return (
          <div>
            {/* Month navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              padding: '0 4px'
            }}>
              <button
                onClick={handlePreviousMonth}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: '#ff6b9d',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff5f7';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                →
              </button>
              
              <h3 style={{
                color: '#ff6b9d',
                fontSize: '16px',
                fontWeight: '600',
                margin: 0
              }}>
                {format(currentMonth, 'MMMM yyyy', { locale: he })}
              </h3>
              
              <button
                onClick={handleNextMonth}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: '#ff6b9d',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff5f7';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ←
              </button>
            </div>

            {/* Calendar grid */}
            <div className="calendar-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
              maxWidth: '100%',
              width: '100%'
            }}>
              {/* Day headers */}
              <div style={{ 
                textAlign: 'center', 
                padding: '4px',
                color: '#ff6b9d',
                fontWeight: '600',
                fontSize: '12px'
              }}>א</div>
              <div style={{ 
                textAlign: 'center', 
                padding: '4px',
                color: '#ff6b9d',
                fontWeight: '600',
                fontSize: '12px'
              }}>ב</div>
              <div style={{ 
                textAlign: 'center', 
                padding: '4px',
                color: '#ff6b9d',
                fontWeight: '600',
                fontSize: '12px'
              }}>ג</div>
              <div style={{ 
                textAlign: 'center', 
                padding: '4px',
                color: '#ff6b9d',
                fontWeight: '600',
                fontSize: '12px'
              }}>ד</div>
              <div style={{ 
                textAlign: 'center', 
                padding: '4px',
                color: '#ff6b9d',
                fontWeight: '600',
                fontSize: '12px'
              }}>ה</div>
              <div style={{ 
                textAlign: 'center', 
                padding: '4px',
                color: '#ff6b9d',
                fontWeight: '600',
                fontSize: '12px'
              }}>ו</div>
              <div style={{ 
                textAlign: 'center', 
                padding: '4px',
                color: '#ff6b9d',
                fontWeight: '600',
                fontSize: '12px'
              }}>ש</div>
              
              {/* Date cells */}
              {calendarDays.map((date, index) => {
                if (!date) {
                  // Empty cell for padding
                  return (
                    <div
                      key={`empty-${index}`}
                      style={{ 
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px'
                      }}
                    />
                  );
                }
                
                const isAvailable = availableDates.some(availableDate => isSameDay(date, availableDate));
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                const isToday = isSameDay(date, new Date());
                
                return (
                  <div
                    key={date.toISOString()}
                    className={`calendar-day ${isSelected ? 'selected' : isAvailable ? 'available' : 'unavailable'}`}
                    onClick={() => isAvailable && handleDateSelect(date)}
                    style={{ 
                      minHeight: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px',
                      backgroundColor: isSelected 
                        ? 'linear-gradient(135deg, #ff6b9d, #ff8fab)' 
                        : isAvailable 
                          ? '#fff5f7'
                          : '#f8f9fa',
                      borderRadius: '8px',
                      border: isSelected
                        ? '2px solid #ff6b9d'
                        : isToday
                          ? '2px solid #ffb3c7'
                          : '1px solid #ffb3c7',
                      cursor: isAvailable ? 'pointer' : 'default',
                      transition: 'all 0.3s ease',
                      boxShadow: isSelected
                        ? '0 4px 15px rgba(255, 107, 157, 0.3)'
                        : '0 2px 4px rgba(255, 179, 199, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      if (isAvailable && !isSelected) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isAvailable && !isSelected) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(255, 179, 199, 0.2)';
                      }
                    }}
                  >
                                         <div style={{ 
                       fontSize: '14px', 
                       fontWeight: isToday ? 'bold' : 'normal',
                       color: isSelected 
                         ? 'white' 
                         : isAvailable 
                           ? '#ff6b9d'
                           : '#6c757d'
                     }}>
                       {format(date, 'd')}
                     </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      };

                       const renderTimeSelection = () => (
       <div>
                   <h3 style={{ 
            color: '#ff6b9d', 
            fontSize: '18px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>בחר שעה</h3>
             <div style={{ 
         marginBottom: '16px',
         padding: '8px',
         backgroundColor: '#fff5f7',
         borderRadius: '6px',
         border: '1px solid #ffb3c7',
         textAlign: 'center'
       }}>
                 <p style={{ 
           color: '#ff6b9d', 
           fontWeight: '500',
           margin: 0,
           fontSize: '14px'
         }}>תאריך נבחר: {selectedDate && format(selectedDate, 'dd/MM/yyyy', { locale: he })}</p>
      </div>
      
      {conflictWarning && (
                 <div style={{
           padding: '8px',
           borderRadius: '6px',
           marginBottom: '16px',
          backgroundColor: conflictWarning.includes('לא ניתן') ? '#ffe6e6' : '#fff3cd',
          border: conflictWarning.includes('לא ניתן') ? '1px solid #ffb3b3' : '1px solid #ffeaa7',
                     color: conflictWarning.includes('לא ניתן') ? '#d63384' : '#856404',
           fontSize: '12px'
        }}>
          {conflictWarning}
        </div>
      )}
      
                           <div className="time-slots" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          maxHeight: '300px',
          overflowY: 'auto',
          paddingRight: '8px'
        }}>
        {timeSlots.map((slot) => (
          <div
            key={slot.time}
            className={`time-slot ${!slot.available ? 'unavailable' : selectedTime === slot.time ? 'selected' : ''}`}
            onClick={() => slot.available && handleTimeSelect(slot.time, slot.conflicts)}
                         style={{
               padding: '8px',
               borderRadius: '6px',
               textAlign: 'center',
               cursor: slot.available ? 'pointer' : 'not-allowed',
              backgroundColor: !slot.available 
                ? '#f8f9fa' 
                : selectedTime === slot.time 
                  ? 'linear-gradient(135deg, #ff6b9d, #ff8fab)'
                  : '#fff5f7',
              border: !slot.available
                ? '1px solid #dee2e6'
                : selectedTime === slot.time
                  ? '2px solid #ff6b9d'
                  : '1px solid #ffb3c7',
              color: !slot.available
                ? '#6c757d'
                : selectedTime === slot.time
                  ? 'white'
                  : '#ff6b9d',
              transition: 'all 0.3s ease',
              boxShadow: selectedTime === slot.time
                ? '0 4px 15px rgba(255, 107, 157, 0.3)'
                : '0 2px 4px rgba(255, 179, 199, 0.2)'
            }}
            onMouseEnter={(e) => {
              if (slot.available && selectedTime !== slot.time) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (slot.available && selectedTime !== slot.time) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(255, 179, 199, 0.2)';
              }
            }}
          >
                         <div style={{ 
               fontSize: '14px', 
               fontWeight: '500'
             }}>{slot.time}</div>
            {slot.conflicts > 0 && (
              <div style={{ 
                fontSize: '10px', 
                marginTop: '4px',
                opacity: 0.8
              }}>
                {slot.conflicts === 1 ? 'רשימת המתנה' : 'תפוס'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

                       const renderDetailsForm = () => (
       <div>
         <h3 style={{ 
           color: '#ff6b9d', 
           fontSize: '20px',
           marginBottom: '20px',
           textAlign: 'center'
         }}>פרטי הזמנה</h3>
      <form onSubmit={handleDetailsSubmit}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            color: '#ff6b9d',
            fontWeight: '500'
          }}>שם מלא</label>
                     <input
             type="text"
             className="form-control"
             value={customerName}
             onChange={(e) => setCustomerName(e.target.value)}
             placeholder="הכנס את שמך המלא"
             required
             style={{
               width: '100%',
               padding: '12px',
               borderRadius: '8px',
               border: '2px solid #ffb3c7',
               fontSize: '16px',
               transition: 'all 0.3s ease',
               color: '#495057',
               textAlign: 'right',
               direction: 'rtl'
             }}
            onFocus={(e) => {
              e.target.style.borderColor = '#ff6b9d';
              e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 157, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ffb3c7';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            color: '#ff6b9d',
            fontWeight: '500'
          }}>מספר טלפון</label>
                     <input
             type="tel"
             className="form-control"
             value={customerPhone}
             onChange={(e) => setCustomerPhone(e.target.value)}
             placeholder="הכנס מספר טלפון"
             required
             style={{
               width: '100%',
               padding: '12px',
               borderRadius: '8px',
               border: '2px solid #ffb3c7',
               fontSize: '16px',
               transition: 'all 0.3s ease',
               color: '#495057',
               textAlign: 'right',
               direction: 'rtl'
             }}
            onFocus={(e) => {
              e.target.style.borderColor = '#ff6b9d';
              e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 157, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ffb3c7';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        <div className="form-group" style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            color: '#ff6b9d',
            fontWeight: '500'
          }}>הערה (אופציונלי)</label>
                     <textarea
             className="form-control"
             value={comment}
             onChange={(e) => setComment(e.target.value)}
             placeholder="הכנס הערה (אופציונלי)"
             rows={3}
             style={{
               width: '100%',
               padding: '12px',
               borderRadius: '8px',
               border: '2px solid #ffb3c7',
               fontSize: '16px',
               resize: 'vertical',
               transition: 'all 0.3s ease',
               color: '#495057',
               textAlign: 'right',
               direction: 'rtl'
             }}
            onFocus={(e) => {
              e.target.style.borderColor = '#ff6b9d';
              e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 157, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ffb3c7';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
                 <button type="submit" className="btn btn-primary" style={{ 
           width: '100%',
           padding: '6px 12px',
           backgroundColor: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
           border: 'none',
           borderRadius: '4px',
           color: 'white',
           fontSize: '12px',
           fontWeight: '600',
           cursor: 'pointer',
           transition: 'all 0.3s ease',
           boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)'
         }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 157, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.3)';
        }}>
          המשך לאישור
        </button>
      </form>
    </div>
  );

                       const renderConfirmation = () => (
       <div>
         <h3 style={{ 
           color: '#ff6b9d', 
           fontSize: '20px',
           marginBottom: '20px',
           textAlign: 'center'
         }}>אישור הזמנה</h3>
      <div style={{
        backgroundColor: '#fff5f7',
        borderRadius: '12px',
        padding: '24px',
        border: '2px solid #ffb3c7',
        marginBottom: '24px'
      }}>
        <h4 style={{ 
          color: '#ff6b9d', 
          marginBottom: '16px',
          fontSize: '18px'
        }}>פרטי השירות</h4>
                 <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ff6b9d' }}>שירות:</strong> {service.name} - {service.duration} דק</p>
        <p style={{ marginBottom: '16px' }}><strong style={{ color: '#ff6b9d' }}>מחיר:</strong> ₪{service.price}</p>
        
        <h4 style={{ 
          color: '#ff6b9d', 
          marginBottom: '16px',
          fontSize: '18px'
        }}>פרטי התור</h4>
        <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ff6b9d' }}>תאריך:</strong> {selectedDate && format(selectedDate, 'dd/MM/yyyy', { locale: he })}</p>
        <p style={{ marginBottom: '16px' }}><strong style={{ color: '#ff6b9d' }}>שעה:</strong> {selectedTime}</p>
        
        <h4 style={{ 
          color: '#ff6b9d', 
          marginBottom: '16px',
          fontSize: '18px'
        }}>פרטי הלקוח</h4>
        <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ff6b9d' }}>שם:</strong> {customerName}</p>
        <p style={{ marginBottom: '8px' }}><strong style={{ color: '#ff6b9d' }}>טלפון:</strong> {customerPhone}</p>
        {comment && <p style={{ marginBottom: 0 }}><strong style={{ color: '#ff6b9d' }}>הערה:</strong> {comment}</p>}
      </div>
      
      <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                 <button 
           onClick={onClose} 
           style={{ 
             flex: 1,
             padding: '6px 10px',
             backgroundColor: '#f8f9fa',
             border: '2px solid #dee2e6',
             borderRadius: '4px',
             color: '#6c757d',
             fontSize: '12px',
             fontWeight: '600',
             cursor: 'pointer',
             transition: 'all 0.3s ease'
           }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e9ecef';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          ביטול
        </button>
                 <button 
           onClick={handleConfirmBooking} 
           style={{ 
             flex: 1,
             padding: '6px 10px',
             background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
             border: 'none',
             borderRadius: '4px',
             color: 'white',
             fontSize: '12px',
             fontWeight: '600',
             cursor: 'pointer',
             transition: 'all 0.3s ease',
             boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)'
           }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 157, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.3)';
          }}
        >
          אישור הזמנה
        </button>
      </div>
    </div>
  );

  return (
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
      padding: '10px'
    }}>
             <div style={{
         backgroundColor: 'white',
         borderRadius: '20px',
         padding: '20px',
         maxWidth: '600px',
         width: '100%',
         boxShadow: '0 20px 60px rgba(255, 107, 157, 0.3)',
         border: '2px solid #ffb3c7'
       }}>
                                   <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '16px'
          }}>
            {(bookingStep.step === 'time' || bookingStep.step === 'details' || bookingStep.step === 'confirmation') && (
              <button 
                onClick={handleBack}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#ff6b9d',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff5f7';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                →
              </button>
            )}
            {bookingStep.step === 'date' && <div style={{ width: '28px' }}></div>}
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#ff6b9d',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff5f7';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
          </div>

        {bookingStep.step === 'date' && renderDateSelection()}
        {bookingStep.step === 'time' && renderTimeSelection()}
        {bookingStep.step === 'details' && renderDetailsForm()}
        {bookingStep.step === 'confirmation' && renderConfirmation()}

        
      </div>
    </div>
  );
};

export default BookingModal;
