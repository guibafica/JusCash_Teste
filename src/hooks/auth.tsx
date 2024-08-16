import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { compare } from "bcryptjs";

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
  signIn(payload: ISignInProps): Promise<string | undefined>;
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
    async ({ email, password }: ISignInProps): Promise<string | undefined> => {
      const foundedUser = getUser(email);

      if (!foundedUser) {
        toast.error("Nenhum usuário encontrado com esse email");

        return;
      }

      const isTheSamePassword = await compare(password, foundedUser.password);

      if (!isTheSamePassword) {
        toast.error("Senha incorreta");

        return;
      }

      const user = {
        id: foundedUser.id,
        name: foundedUser.fullName,
        email: foundedUser.email,
      };
      const token = "fake-token";

      localStorage.setItem("@jusCash:token", token);
      localStorage.setItem("@jusCash:auth", JSON.stringify(user));

      setData({ token, user });

      return token;
    },
    [getUser]
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@jusCash:token");
    localStorage.removeItem("@jusCash:auth");

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
