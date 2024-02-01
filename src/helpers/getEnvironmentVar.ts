export const getEnvironmentVar = (token: string): string => {
  return import.meta.env[token];
};
