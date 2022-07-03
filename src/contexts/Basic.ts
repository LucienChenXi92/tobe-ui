export type Action = {
  type: string;
  payload?: any;
};

export type AuthState = {
  user: any;
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
