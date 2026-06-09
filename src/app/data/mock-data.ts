export interface Vehicle {
  id: string;
  name: string;
  category: 'SUV' | 'Luxury' | 'Sedan' | 'Electric';
  image: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  fuel: 'EV' | 'Hybrid' | 'Gas';
  features: string[];
  transmission: string;
  seats: number;
  loyaltyPoints: number;
}

export interface FleetVehicle {
  id: string;
  model: string;
  licensePlate: string;
  location: string;
  status: 'Active' | 'Booked' | 'Maintenance';
  salikStatus: 'Synced' | 'Pending' | 'Error';
  fines: number;
  lat: number;
  lng: number;
}

export interface Booking {
  id: string;
  customerName: string;
  vehicle: string;
  pickupDate: string;
  returnDate: string;
  status: 'Pending' | 'Active' | 'Completed';
  totalAmount: number;
}

export const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Tesla Model Y',
    category: 'Electric',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    dailyRate: 299,
    weeklyRate: 1799,
    monthlyRate: 6999,
    fuel: 'EV',
    features: ['Sunroof', 'GPS', 'Autopilot', '4x4'],
    transmission: 'Automatic',
    seats: 5,
    loyaltyPoints: 500,
  },
  {
    id: '2',
    name: 'BMW 7 Series',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    dailyRate: 499,
    weeklyRate: 2999,
    monthlyRate: 11999,
    fuel: 'Gas',
    features: ['Sunroof', 'GPS', 'Massage Seats', 'Premium Sound'],
    transmission: 'Automatic',
    seats: 5,
    loyaltyPoints: 750,
  },
  {
    id: '3',
    name: 'Land Rover Defender',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    dailyRate: 399,
    weeklyRate: 2399,
    monthlyRate: 9499,
    fuel: 'Gas',
    features: ['Sunroof', 'GPS', '4x4', 'Off-road Package'],
    transmission: 'Automatic',
    seats: 7,
    loyaltyPoints: 600,
  },
  {
    id: '4',
    name: 'Mercedes S-Class',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    dailyRate: 549,
    weeklyRate: 3299,
    monthlyRate: 12999,
    fuel: 'Hybrid',
    features: ['Sunroof', 'GPS', 'Chauffeur Mode', 'Premium Sound'],
    transmission: 'Automatic',
    seats: 5,
    loyaltyPoints: 800,
  },
  {
    id: '5',
    name: 'Audi e-tron GT',
    category: 'Electric',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80',
    dailyRate: 449,
    weeklyRate: 2699,
    monthlyRate: 10499,
    fuel: 'EV',
    features: ['Sunroof', 'GPS', 'Sport Mode', 'Premium Sound'],
    transmission: 'Automatic',
    seats: 4,
    loyaltyPoints: 700,
  },
  {
    id: '6',
    name: 'Toyota Camry',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
    dailyRate: 149,
    weeklyRate: 899,
    monthlyRate: 3499,
    fuel: 'Hybrid',
    features: ['GPS', 'Bluetooth', 'Backup Camera'],
    transmission: 'Automatic',
    seats: 5,
    loyaltyPoints: 250,
  },
  {
    id: '7',
    name: 'Range Rover Sport',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
    dailyRate: 599,
    weeklyRate: 3599,
    monthlyRate: 14299,
    fuel: 'Gas',
    features: ['Sunroof', 'GPS', '4x4', 'Premium Sound', 'Air Suspension'],
    transmission: 'Automatic',
    seats: 7,
    loyaltyPoints: 900,
  },
  {
    id: '8',
    name: 'Porsche Taycan',
    category: 'Electric',
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=800&q=80',
    dailyRate: 649,
    weeklyRate: 3899,
    monthlyRate: 15499,
    fuel: 'EV',
    features: ['GPS', 'Sport Mode', 'Premium Sound', 'Performance Package'],
    transmission: 'Automatic',
    seats: 4,
    loyaltyPoints: 1000,
  },
];

export const fleetVehicles: FleetVehicle[] = [
  {
    id: 'F001',
    model: 'Tesla Model Y',
    licensePlate: 'DXB-A-12345',
    location: 'Dubai Marina',
    status: 'Active',
    salikStatus: 'Synced',
    fines: 0,
    lat: 25.0657,
    lng: 55.1364,
  },
  {
    id: 'F002',
    model: 'BMW 7 Series',
    licensePlate: 'DXB-B-67890',
    location: 'Downtown Dubai',
    status: 'Booked',
    salikStatus: 'Synced',
    fines: 0,
    lat: 25.1972,
    lng: 55.2744,
  },
  {
    id: 'F003',
    model: 'Land Rover Defender',
    licensePlate: 'AUH-C-45678',
    location: 'Abu Dhabi Airport',
    status: 'Active',
    salikStatus: 'Pending',
    fines: 200,
    lat: 24.4330,
    lng: 54.6510,
  },
  {
    id: 'F004',
    model: 'Mercedes S-Class',
    licensePlate: 'DXB-D-23456',
    location: 'Jumeirah Beach',
    status: 'Active',
    salikStatus: 'Synced',
    fines: 0,
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    id: 'F005',
    model: 'Audi e-tron GT',
    licensePlate: 'SHJ-E-78901',
    location: 'Sharjah City',
    status: 'Maintenance',
    salikStatus: 'Error',
    fines: 0,
    lat: 25.3463,
    lng: 55.4209,
  },
  {
    id: 'F006',
    model: 'Toyota Camry',
    licensePlate: 'DXB-F-34567',
    location: 'Dubai Mall',
    status: 'Booked',
    salikStatus: 'Synced',
    fines: 0,
    lat: 25.1986,
    lng: 55.2790,
  },
  {
    id: 'F007',
    model: 'Range Rover Sport',
    licensePlate: 'DXB-G-89012',
    location: 'Palm Jumeirah',
    status: 'Active',
    salikStatus: 'Synced',
    fines: 0,
    lat: 25.1124,
    lng: 55.1390,
  },
  {
    id: 'F008',
    model: 'Porsche Taycan',
    licensePlate: 'AUH-H-56789',
    location: 'Yas Island',
    status: 'Active',
    salikStatus: 'Synced',
    fines: 600,
    lat: 24.4672,
    lng: 54.6067,
  },
];

export const bookings: Booking[] = [
  {
    id: 'B001',
    customerName: 'Ahmed Al Maktoum',
    vehicle: 'Tesla Model Y',
    pickupDate: '2026-06-10',
    returnDate: '2026-06-15',
    status: 'Active',
    totalAmount: 1495,
  },
  {
    id: 'B002',
    customerName: 'Sarah Johnson',
    vehicle: 'BMW 7 Series',
    pickupDate: '2026-06-08',
    returnDate: '2026-06-12',
    status: 'Active',
    totalAmount: 1996,
  },
  {
    id: 'B003',
    customerName: 'Mohammed Hassan',
    vehicle: 'Toyota Camry',
    pickupDate: '2026-06-09',
    returnDate: '2026-06-16',
    status: 'Pending',
    totalAmount: 1043,
  },
  {
    id: 'B004',
    customerName: 'Emily Chen',
    vehicle: 'Range Rover Sport',
    pickupDate: '2026-06-07',
    returnDate: '2026-06-14',
    status: 'Completed',
    totalAmount: 4193,
  },
];
