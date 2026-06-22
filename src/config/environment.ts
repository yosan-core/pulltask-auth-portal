const fetchTimeoutMs = 30_000;
const maxRetries = 3;

const environment = {
  AUTH_API_URL: import.meta.env.VITE_AUTH_API_URL as string,
};

export { environment, fetchTimeoutMs, maxRetries };
