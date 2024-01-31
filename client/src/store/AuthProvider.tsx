import { ReactNode, useState } from "react";
import AuthContext from "./auth-context";

type Props = {
  children: ReactNode;
};

type State = {
  isLoggedIn: boolean;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<State>({
    isLoggedIn: !!localStorage.getItem("access"),
  });

  const login = () => {
    setAuth((prevState) => ({
      ...prevState,
      isLoggedIn: !!localStorage.getItem("access"),
    }));
  };

  const logout = () => {
    setAuth((prevState) => ({
      ...prevState,
      isLoggedIn: !!localStorage.getItem("access"),
    }));
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: auth.isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
