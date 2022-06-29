export type Action = {
  type: string;
  payload?: any;
  error?: any;
};

export type AuthState = {
  user: any;
  token: string;
  loading: boolean;
  errorMessage: string | null;
};

export interface User {
  id: number;
  email: string;
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
  phoneNum: string | undefined;
  address: string | undefined;
}
