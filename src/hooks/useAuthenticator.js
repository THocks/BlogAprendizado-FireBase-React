import { db } from "../firebase/config";

// hooks do fireBase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthenticator = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);
  // Iremos chamar para fazer autenticações
  // Chamei minhas autenticação
  const auth = getAuth();
  //register
  function checkifIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkifIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let errorMessage;
      if (error.message.includes("Password")) {
        errorMessage = "Senha precisa conter pelo menos 8 caracteres";
      } else if (error.message.includes("email-already")) {
        errorMessage = "E-mail ja cadastrado";
      } else {
        errorMessage = "Ocorreu um erro , por favor tente mais tarde";
      }
      setLoading(false);
      setError(errorMessage);
    }
  };

  //logout

  const logout = () => {
    checkifIsCancelled();
    signOut(auth);
  };

  //Login - sign-in
  const login = async (data) => {
    checkifIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let errorSystem;

      if (error.message.includes("user-not-found")) {
        errorSystem = "Usuario não encontrado";
      } else if (error.message.includes("wrong-password")) {
        errorSystem = "Senha incorreta por favor verifique e tente novamente";
      } else {
        errorSystem =
          "Ocorreu um erro em nosso sistema por favor tente mas tarde";
      }
      setError(errorSystem);
      setLoading(false);
    }
  };
  /************************************ */

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
