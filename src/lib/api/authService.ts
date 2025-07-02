import { api } from "./axioInstance";

export interface RegisterPayload {
  name: string;
  phone: string;
  code: string;
  gender: "MALE" | "FEMALE";
}

export const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post("/customer/register", payload);
  return response.data;
};

export const sendOtpCode = async (phone: string) => {
  const response = await api.post("/customer/send-code", { phone });
  return response.data;
};
