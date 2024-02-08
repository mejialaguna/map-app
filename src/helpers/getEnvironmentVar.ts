export const getEnvironmentVar = (token: string): string | undefined => {
  const envToken = import.meta.env[token];
  if (token && envToken) {
    return envToken;
  } else {
    console.error(`Could not find environment variable, this ${token} does not exist`)
    return undefined;
  }
};