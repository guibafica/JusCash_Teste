import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from "react";
import { toast } from "sonner";

import { UseUser } from "./user";

interface ILoggedUser {
  name: string;
  email: string;
}

interface IAuthState {
  token: string;
  user: ILoggedUser;
}

interface ISignInProps {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: ILoggedUser;
  signIn(payload: ISignInProps): void;
  signOut(): void;
}

interface IAppProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
);

export const AuthProvider: React.FC<IAppProviderProps> = ({ children }) => {
  const { getUser } = UseUser();

  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem("@jusCash:token");
    const user = localStorage.getItem("@jusCash:auth");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: ISignInProps) => {
      const foundedUser = getUser(email);

      if (!foundedUser) {
        toast.error("Nenhum usuário encontrado com esse email");

        return;
      }

      toast.success("ENCONTROU");

      // const response = await api.post('sessions', {
      //   email,
      //   password,
      // });

      // const { token, user } = response.data;

      // localStorage.setItem('@GoBarber:token', token);
      // localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      // setData({ token, user });
    },
    [getUser]
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@GoBarber:token");
    localStorage.removeItem("@GoBarber:user");

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function UseAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth mut be user within an AuthProvider");
  }

  return context;
}
