export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  image?: string;
  description?: string;
}

export interface Business {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  workingHours: WorkingHours;
  instagramUrl?: string;
  services: Service[];
}

export interface WorkingHours {
  sunday: { start: string; end: string; isOpen: boolean };
  monday: { start: string; end: string; isOpen: boolean };
  tuesday: { start: string; end: string; isOpen: boolean };
  wednesday: { start: string; end: string; isOpen: boolean };
  thursday: { start: string; end: string; isOpen: boolean };
  friday: { start: string; end: string; isOpen: boolean };
  saturday: { start: string; end: string; isOpen: boolean };
}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'waiting';
  comment?: string;
  rating?: number;
  businessId: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  appointments: Appointment[];
}

export interface BookingStep {
  step: 'service' | 'date' | 'time' | 'details' | 'confirmation';
  selectedService?: Service;
  selectedDate?: string;
  selectedTime?: string;
  customerName?: string;
  customerPhone?: string;
  comment?: string;
  rating?: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  conflicts: number;
}
