export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string;
  venueName: string;
  imageUrl: string;
  price: number; // 0 for free
  capacity: number;
  ticketsSold: number;
  organizer: {
    name: string;
    email: string;
    phone: string;
    avatarUrl?: string;
  };
  schedule: Array<{
    time: string;
    activity: string;
  }>;
  featured?: boolean;
}

export type EventCategory = 'Concerts' | 'Seminars' | 'Workshops' | 'Festivals' | 'Exhibitions';

export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventPrice: number;
  eventImageUrl: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  ticketCount: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentMethod: string;
  referenceCode: string;
  seats?: string[];
}

export interface User {
  email: string;
  name: string;
  role: 'user' | 'admin';
  isAuthenticated: boolean;
}

export interface SearchFilters {
  searchQuery: string;
  category: EventCategory | 'All';
  priceRange: 'All' | 'Free' | 'Under $50' | '$50 - $100' | 'Over $100';
  dateFilter: 'All' | 'Today' | 'This Week' | 'This Month';
}
