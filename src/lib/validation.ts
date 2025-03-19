export const isValidUrl = (url?: string): boolean => {
  if (!url) return false;
  try {
    return url.startsWith("/assets") || url.startsWith("http");
  } catch (error) {
    return false;
  }
};

export const isValidPhone = (phone?: string): boolean => {
  if (!phone) return false;
  return /^\d{10}$/.test(phone);
};

export const isValidEmail = (email?: string): boolean => {
  if (!email) return false;
  return /\S+@\S+\.\S+/.test(email);
};

export const isValidPassword = (password?: string): string => {
  if (!password) return "Enter your password";
  return password.length >= 6 ? "" : "Password must be at least 6 characters";
};
