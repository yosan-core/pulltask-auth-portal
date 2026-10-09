const fetchTimeoutMs = 30_000;
const maxRetries = 3;

const environment = {
  AUTH_PERSISTENCE_API_URL: import.meta.env.VITE_AUTH_PERSISTENCE_API_URL as string,
  AUTH_QUERY_API_URL:       import.meta.env.VITE_AUTH_QUERY_API_URL       as string,
  BUSINESS_UNIT:            import.meta.env.VITE_BUSINESS_UNIT            as string,
  KANBAN_PORTAL_URL:        import.meta.env.VITE_KANBAN_PORTAL_URL        as string,
  ORGANIZATION_ID:          import.meta.env.VITE_ORGANIZATION_ID          as string,
};

export { environment, fetchTimeoutMs, maxRetries };
