export interface UserState {
  uid: string;
  emailVerified: boolean;
  email: string;
  phoneNumber: string;
  fullname: string;
  token: string;
  refreshToken: string;
  rememberMe: boolean;
}

export interface Patient {
  fullname: string;
  image: string;
  code: string;
}

export interface AppointmentData {
  patient: Patient;
  appointment: string;
  date: string;
  time: string;
  status: string;
  id: string;
}
