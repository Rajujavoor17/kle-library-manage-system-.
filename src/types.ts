export interface Lesson {
  id: string;
  title: string;
  content?: string;
  videoUrl?: string;
}

export interface Unit {
  id: number;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverId: string;
  coverUrl?: string;
  available: boolean;
  publisher?: string;
  year?: number;
  isbn?: string;
  pages?: number;
  description?: string;
  units?: Unit[];
  reviews?: Review[];
}

export interface Cluster {
  id: string;
  name: string;
  field: string;
  members: number;
  active: boolean;
  intensity: number;
}

export type Role = 'Student' | 'Employee' | 'Admin';
