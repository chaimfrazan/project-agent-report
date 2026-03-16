
export interface User {
  id: number;
  password: number | null
  fullName: string;
  role: "admin" | "agent";
}


export interface IUserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface JwtPayload {
  exp: number;
}