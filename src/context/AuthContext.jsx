import { createContext, useContext, useMemo, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => Cookies.get('jwt_token') || '');

  const login = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    Cookies.remove('jwt_token');
    setToken('');
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
      isAuthenticated: Boolean(token)
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
