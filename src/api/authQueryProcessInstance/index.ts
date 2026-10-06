import axios, { AxiosInstance } from "axios";
import { environment, fetchTimeoutMs } from "@config/environment";

const authQueryProcessInstance: AxiosInstance = axios.create({
  baseURL: environment.AUTH_QUERY_API_URL,
  timeout: fetchTimeoutMs,
  headers: {
    "Content-Type":   "application/json",
    "X-Business-Unit": environment.BUSINESS_UNIT,
  },
});

authQueryProcessInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("pulltask_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authQueryProcessInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        console.error("Request timed out");
      }
      return Promise.resolve(error.response);
    }
    return Promise.reject(new Error("Unknown error occurred"));
  },
);

export { authQueryProcessInstance };
