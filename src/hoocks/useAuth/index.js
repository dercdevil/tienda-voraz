import request from "api";
import { useMutation } from "react-query";
import {notify} from "utils/notify";

export const useAuth = () => {

  const {
    mutate: signIn,
    isLoading: isSigningIn,
    error: errorSigningIn,
  } = useMutation(
    ({ rut, password }) => request.auth.signIn({ rut, password }),
    {
      onSuccess: ({ user, token }) => {
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("id", user.id);
          window.location.href = "/home/Orders";
          notify("Usuario logueado con exito","success")
        }
      },
      onError:()=>{
        notify("Error al ingresar las credenciales")
      }
    }
  );

  return {
    isLoading: isSigningIn,
    error: errorSigningIn,
    signIn,
  };
};
