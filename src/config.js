const env = process.env.REACT_APP_ENVIRONMENT
export const baseUrl = env == "development" ? "http://localhost:3001" : env == "production" ? "<production-url>" : "xyz";