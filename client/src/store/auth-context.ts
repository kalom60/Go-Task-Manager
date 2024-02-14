import { createContext } from "react";
import { LoginInfo } from "./AuthProvider";

type AuthContextProps = {
  isLoggedIn: boolean;
  signUp: (body: LoginInfo) => void;
  login: (body: LoginInfo) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;
