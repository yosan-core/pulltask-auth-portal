import { authProcessInstance } from "@api/authProcessInstance";
import { RegisterRequest, RegisterResponse } from "@domain/auth";

const register = async (request: RegisterRequest): Promise<RegisterResponse> => {
  const { data, status } = await authProcessInstance.post<RegisterResponse>(
    "/user-accounts/",
    request,
    { headers: { "X-Action": "RegisterUserAccount" } },
  );

  if (!data || status < 200 || status >= 300) {
    throw new Error("Registration failed");
  }

  return data;
};

export { register };
