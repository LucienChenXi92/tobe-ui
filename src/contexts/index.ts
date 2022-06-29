import { loginUser, updateProfile } from "./Auth/action";
import { AuthProvider, useAuthDispatch, useAuthState } from "./Auth/context";

export {
  AuthProvider,
  useAuthState,
  useAuthDispatch,
  loginUser,
  updateProfile,
};
