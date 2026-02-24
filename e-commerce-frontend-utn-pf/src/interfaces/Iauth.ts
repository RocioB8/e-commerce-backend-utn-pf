interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  authContextLogin: (credentials: object) => Promise<boolean>;
  authContextRegister: (userData: object) => Promise<Response>;
  authContextLogout: () => void;
}

export type { User, AuthContextType };