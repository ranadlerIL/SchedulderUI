import { Business, Service, Appointment, WorkingHours } from '../types';

export const mockWorkingHours: WorkingHours = {
  sunday: { start: '09:00', end: '18:00', isOpen: true },
  monday: { start: '09:00', end: '18:00', isOpen: true },
  tuesday: { start: '09:00', end: '18:00', isOpen: true },
  wednesday: { start: '09:00', end: '18:00', isOpen: true },
  thursday: { start: '09:00', end: '18:00', isOpen: true },
  friday: { start: '09:00', end: '16:00', isOpen: true },
  saturday: { start: '10:00', end: '16:00', isOpen: true },
};

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'מניקור קלאסי',
    price: 80,
    duration: 45,
    description: 'מניקור מקצועי עם לק ג\'ל',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'פדיקור קלאסי',
    price: 90,
    duration: 60,
    description: 'פדיקור מקצועי עם לק ג\'ל',
    image: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716e?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'מניקור + פדיקור',
    price: 150,
    duration: 90,
    description: 'חבילה מלאה למניקור ופדיקור',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'בניית ציפורניים',
    price: 120,
    duration: 75,
    description: 'בניית ציפורניים עם אקריליק',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    name: 'עיצוב ציפורניים',
    price: 60,
    duration: 30,
    description: 'עיצוב מיוחד לציפורניים',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    name: 'טיפול ציפורניים',
    price: 50,
    duration: 25,
    description: 'טיפול בסיסי לציפורניים',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop'
  }
];

export const mockBusiness: Business = {
  id: '1',
  name: 'יופי של ציפורניים',
  email: 'info@nails-beauty.co.il',
  phone: '050-1234567',
  address: 'רחוב הרצל 123, תל אביב',
  workingHours: mockWorkingHours,
  instagramUrl: 'https://instagram.com/nails_beauty',
  services: mockServices,
};

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    customerName: 'שרה כהן',
    customerPhone: '050-1111111',
    serviceId: '1',
    serviceName: 'מניקור קלאסי',
    date: '2024-01-15',
    time: '10:00',
    status: 'approved',
    comment: 'שירות מעולה!',
    rating: 5,
    businessId: '1'
  },
  {
    id: '2',
    customerName: 'מיכל לוי',
    customerPhone: '050-2222222',
    serviceId: '2',
    serviceName: 'פדיקור קלאסי',
    date: '2024-01-15',
    time: '11:00',
    status: 'pending',
    businessId: '1'
  },
  {
    id: '3',
    customerName: 'דנה אברהם',
    customerPhone: '050-3333333',
    serviceId: '3',
    serviceName: 'מניקור + פדיקור',
    date: '2024-01-16',
    time: '14:00',
    status: 'waiting',
    businessId: '1'
  },
  // Additional mock data for demonstration
  {
    id: '4',
    customerName: 'רן אדלר',
    customerPhone: '0523133310',
    serviceId: '1',
    serviceName: 'מניקור קלאסי',
    date: '2024-01-20',
    time: '15:30',
    status: 'approved',
    comment: 'תור ראשון, מאוד שמח!',
    rating: 5,
    businessId: '1'
  },
  {
    id: '5',
    customerName: 'רן אדלר',
    customerPhone: '0523133310',
    serviceId: '4',
    serviceName: 'בניית ציפורניים',
    date: '2024-01-25',
    time: '12:00',
    status: 'pending',
    comment: 'רוצה ציפורניים ארוכות',
    businessId: '1'
  },
  {
    id: '6',
    customerName: 'רן אדלר',
    customerPhone: '0523133310',
    serviceId: '5',
    serviceName: 'עיצוב ציפורניים',
    date: '2024-01-28',
    time: '16:00',
    status: 'waiting',
    comment: 'עיצוב מיוחד ליום הולדת',
    businessId: '1'
  },
  {
    id: '7',
    customerName: 'רן אדלר',
    customerPhone: '0523133310',
    serviceId: '3',
    serviceName: 'מניקור + פדיקור',
    date: '2024-02-01',
    time: '10:00',
    status: 'approved',
    comment: 'חבילה מלאה',
    rating: 4,
    businessId: '1'
  }
];

// Mock authentication codes for demo
export const mockAuthCodes = {
  '050-1111111': '123456',
  '050-2222222': '654321',
  '050-3333333': '111111',
  '0523133310': '123456',
  'info@nails-beauty.co.il': '999999'
};
