// src/lib/api/types.ts

// ===== Raw API entities =====
export interface ApiCategoryTranslation {
  locale: string;
  title: string;
  parent_id: number;
  created_at: string;
  updated_at: string;
}

export interface ApiCategory {
  id: number;
  image_ar?: string; // Arabic image
  image_en?: string; // English image
  created_at: string;
  updated_at: string;
  translations: ApiCategoryTranslation[];
}

export type ProgramType = "live" | "registered" | "onsite";

export interface ApiTeacher {
  id: number;
  name: string;
  image?: string | null;
}

export interface ApiProgramTranslation {
  locale: string;
  title: string;
  description: string;
  learning: string[];
  requirement: string[];
  main_axes?: string[];
  parent_id: number;
  created_at: string;
  updated_at: string;
}

export interface ApiProgram {
  id: number;
  slug?: string;
  image: string;
  price: number;
  type?: ProgramType;
  level?: string;
  have_certificate?: 0 | 1;
  is_interested?: boolean;
  date_from?: string | null;
  date_to?: string | null;
  time?: string | null;
  is_live?: 0 | 1;
  address?: string | null;
  url?: string | null;
  user_type?: string | null;
  duration: number | string | null;
  program_duration: number | string | null;
  subscriptions_count?: number;
  category_id?: number;
  teacher_id?: number;
  category?: ApiCategory | null;
  teacher?: ApiTeacher | null;
  translations: ApiProgramTranslation[];
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
}

export interface ApiItemResponse<T> {
  success: boolean;
  data: T;
}

// ===== App-friendly models =====
export interface Category {
  id: number;
  title: string;
  imageUrl: string; // absolute
}

export interface Teacher {
  id: number;
  name: string;
  imageUrl?: string | null; // absolute
}

export interface Program {
  id: number;
  slug?: string;
  title: string;
  imageUrl: string; // absolute
  price: number;
  type?: ProgramType;
  level?: string;
  haveCertificate?: boolean;
  dateFrom?: string | null;
  dateTo?: string | null;
  time?: string | null;
  isLive?: boolean;
  address?: string | null;
  url?: string | null;
  description: string;
  userType?: string | null;
  learning?: string[] | null;
  requirement?: string[] | null;
  mainAxes?: string[] | null;
  durationHours?: number | null;
  duration?: number | null; // Duration in days from API
  subscriptionsCount?: number;
  category?: { id: number; title: string } | null;
  teacher?: Teacher | null;
  isInterested?: boolean;
}

// ===== Contact Us =====
export interface ContactUsPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  program_id?: number;
}x
export interface ContactUsResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}

// ===== Workshop Registration =====
export interface WorkshopRegistrationPayload {
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  job_title?: string;
  workshop_title: string;
  participants_count?: number; // default to 1 on backend
  special_requests?: string;
}

export interface WorkshopRegistrationResponse {
  success: boolean;
  message?: string;
  data?: {
    id: number | string;
    full_name: string;
    email: string;
    phone?: string | null;
    organization?: string | null;
    job_title?: string | null;
    workshop_title: string;
    participants_count: number;
    special_requests?: string | null;
    status?: string;
    [k: string]: unknown;
  };
}

// ===== Login =====
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseUser {
  id: number;
  name?: string;
  email: string;
  // add any extra fields your backend returns
  [k: string]: unknown;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: LoginResponseUser;
    [k: string]: unknown;
  };
}

// ===== Common backend error payload =====
export interface BackendErrorResponse {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[] | string>;
}

export interface ApiPaginated<T> {
  current_page: number;
  data: T[];
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiPaginatedResponse<T> {
  success: boolean;
  data: ApiPaginated<T>;
}
