// jwtUtils.js
import jwt from 'jsonwebtoken';

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const decoded = jwt.decode(token);
    if (decoded && decoded.exp) {
      // Check if the token is expired
      return Date.now() >= decoded.exp * 1000;
    }
  } catch (error) {
    console.error('Error decoding JWT token:', error);
  }
  return true;
};
