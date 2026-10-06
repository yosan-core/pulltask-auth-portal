import { authPersistenceProcessInstance } from "@api/authPersistenceProcessInstance";
import { LoginRequest, LoginResponse } from "@domain/auth";

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const { data, status } = await authPersistenceProcessInstance.post<LoginResponse>(
    "/user-accounts/",
    request,
    { headers: { "X-Action": "AuthenticationByCredential" } },
  );

  if (!data || status < 200 || status >= 300) {
    throw new Error("Invalid credentials");
  }

  return data;
};

export { login };
