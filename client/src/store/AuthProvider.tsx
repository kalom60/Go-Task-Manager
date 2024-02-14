import { ReactNode, useState } from "react";
import AuthContext from "./auth-context";
import { loginUser, logoutUser, signUpUser } from "../service/api";

type Props = {
  children: ReactNode;
};

type State = {
  isLoggedIn: boolean;
};

export type LoginInfo = {
  email: string;
  password: string;
};

export type SignUpInfo = {
  username: string;
  email: string;
  password: string;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<State>({
    isLoggedIn: !!localStorage.getItem("access"),
  });

  const signUp = async (body: LoginInfo) => {
    try {
      await signUpUser(JSON.stringify(body));
      setAuth((prevState) => ({
        ...prevState,
        isLoggedIn: !!localStorage.getItem("access"),
      }));
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        "message" in err
      ) {
        if (typeof err.message === "string") {
          throw new Error(err.message);
        }
      }
    }
  };

  const login = async (body: LoginInfo) => {
    try {
      await loginUser(JSON.stringify(body));
      setAuth((prevState) => ({
        ...prevState,
        isLoggedIn: !!localStorage.getItem("access"),
      }));
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        "message" in err
      ) {
        if (typeof err.message === "string") {
          throw new Error(err.message);
        }
      }
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setAuth((prevState) => ({
        ...prevState,
        isLoggedIn: !!localStorage.getItem("access"),
      }));
    } catch (err) {
      setAuth((prevState) => ({
        ...prevState,
        isLoggedIn: !!localStorage.getItem("access"),
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: auth.isLoggedIn, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
