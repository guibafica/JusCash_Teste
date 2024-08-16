import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { hash } from "bcryptjs";

interface IUserProps {
  fullName: string;
  email: string;
  password: string;
}

interface IUserContextData {
  users: IUserProps[];
  createUser(payload: IUserProps): void;
  getUser(text: string): IUserProps | undefined;
}

interface IAppProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<IUserContextData>(
  {} as IUserContextData
);

export const UserProvider: React.FC<IAppProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<IUserProps[]>([]);

  const createUser = useCallback(
    async (payload: IUserProps) => {
      const hashedPassword = await hash(payload.password, 8);

      console.log("SENHA: ", hashedPassword);

      const newUsersArray: IUserProps[] = [
        ...users,
        {
          email: payload.email,
          fullName: payload.fullName,
          password: hashedPassword,
        },
      ];

      localStorage.setItem("@jusCash:users", JSON.stringify(newUsersArray));
      setUsers(newUsersArray);
    },
    [users]
  );

  const getUser = useCallback(
    (text: string) => {
      const lowerCaseSearchText = text.toLowerCase();

      const foundUser = users.find(
        (user) =>
          user.fullName.toLowerCase().includes(lowerCaseSearchText) ||
          user.email.toLowerCase().includes(lowerCaseSearchText)
      );

      return foundUser;
    },
    [users]
  );

  const loadData = useCallback(() => {
    const localItemUsers = localStorage.getItem("@jusCash:users");

    if (localItemUsers && localItemUsers?.length > 0) {
      setUsers(JSON.parse(localItemUsers));

      return;
    }

    const defaultUser = {
      fullName: "John Doe",
      email: "johnDoe@email.com",
      password: "123456",
    };

    localStorage.setItem("@jusCash:users", JSON.stringify([defaultUser]));
    setUsers([defaultUser]);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <UserContext.Provider value={{ users, createUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function UseUser(): IUserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser mut be user within an UserProvider");
  }

  return context;
}
