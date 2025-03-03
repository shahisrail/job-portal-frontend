// utils/auth.js
export const getUserRole = () => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
  
    if (!token) return null; // No token means user is not logged in
  
    // You can decode the JWT to extract user information (e.g., role) if needed
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    
    return decodedToken?.role; // assuming the role is stored in the token
  };
  