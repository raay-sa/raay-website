import { httpJson, httpFormData, HttpError } from "./http";
import { httpJsonWithAuth } from "./httpWithAuth";
import { authenticatedPost, authenticatedDelete } from "./authUtils";

export interface BackendErrorResponse {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[] | string>;
}

export type RefreshResponse = {
  success: boolean;
  access_token?: string;
  message?: string;
};

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginUser {
  id: number;
  name?: string;
  email: string;
  [k: string]: unknown;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    token?: string;
    refresh_token?: string; // NEW
    user?: LoginUser;
    [k: string]: unknown;
  };
}

export async function postLogin(payload: LoginPayload) {
  return httpJson<AuthResponse, LoginPayload>("login", {
    method: "POST",
    body: payload,
  });
}

// ---- Register (student only) ----
export type RegisterPayload = {
  name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  education?: string;
  bio?: string;
  image?: File | null;
};

export function buildRegisterForm(p: RegisterPayload) {
  const fd = new FormData();
  fd.append("name", p.name);
  fd.append("user_type", "student"); // force student
  fd.append("phone", p.phone);
  fd.append("email", p.email);
  fd.append("password", p.password);
  fd.append("password_confirmation", p.password_confirmation);
  if (p.education) fd.append("education", p.education);
  if (p.bio) fd.append("bio", p.bio);
  if (p.image) fd.append("image", p.image);
  return fd;
}

export async function postRegister(payload: RegisterPayload) {
  const form = buildRegisterForm(payload);
  return httpFormData<AuthResponse>("register", form, { method: "POST" });
}

// ---- OTP APIs (email-based) ----
export type SendOtpPayload = {
  email: string;
  auth_method: "register" | "login";
};

export type VerifyOtpPayload = {
  email: string;
  code: string;
  auth_method: "register" | "login";
};

export async function postSendOtp(payload: SendOtpPayload) {
  return httpJson<AuthResponse, SendOtpPayload>("sendOtp", {
    method: "POST",
    body: payload,
  });
}

export async function postVerifyOtp(payload: VerifyOtpPayload) {
  return httpJson<AuthResponse, VerifyOtpPayload>("verifyOtp", {
    method: "POST",
    body: payload,
  });
}

//  refresh token
export async function postRefreshToken(refresh_token: string) {
  // body stays the same; response type changes
  return httpJson<RefreshResponse, { refresh_token: string }>("refresh_token", {
    method: "POST",
    body: { refresh_token },
  });
}

// ---- Program Interest APIs ----
export interface ProgramInterestResponse {
  success: boolean;
  message?: string;
  data?: {
    program_id: number;
    program_title?: string;
    interested_count: number;
  };
}

async function makeAuthenticatedRequest<T>(
  url: string,
  method: "POST" | "DELETE",
  token: string
): Promise<T> {
  // Use the utility functions that automatically handle token refresh
  if (method === "POST") {
    return authenticatedPost<T>(url, token);
  } else {
    return authenticatedDelete<T>(url, token);
  }
}

export async function postRegisterProgramInterest(programId: number, token: string) {
  return makeAuthenticatedRequest<ProgramInterestResponse>(
    `public/programs/${programId}/register-interest`,
    "POST",
    token
  );
}

export async function deleteRemoveProgramInterest(programId: number, token: string) {
  return makeAuthenticatedRequest<ProgramInterestResponse>(
    `public/programs/${programId}/remove-interest`,
    "DELETE",
    token
  );
}