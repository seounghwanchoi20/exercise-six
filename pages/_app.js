import "@/styles/globals.css";
import Header from "@/components/Header";
import { useCallback, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "exercise-six-c59d6.firebaseapp.com",
  projectId: "exercise-six-c59d6",
  storageBucket: "exercise-six-c59d6.firebasestorage.app",
  messagingSenderId: "464364818213",
  appId: "1:464364818213:web:43ecbcc5854bafe72a54cc",
};

export default function App({ Component, pageProps }) {
  const [appInitialized, setAppInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  const [error, setError] = useState(null);

  const createUserFunction = useCallback(
    (e) => {
      e.preventDefault();

      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoggedIn(true);
          setUserInformation(user);
          setError(null);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.warn({ error, errorCode, errorMessage });
          setError(errorMessage);
        });
    },
    [setError, setIsLoggedIn, setUserInformation]
  );

  const loginUserFunction = useCallback(
    (e) => {
      e.preventDefault();

      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      const auth = getAuth();

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoggedIn(true);
          setUserInformation(user);
          setError(null);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.warn({ error, errorCode, errorMessage });
          setError(errorMessage);
        });
    },
    [setError, setIsLoggedIn, setUserInformation]
  );

  const logoutUserFunction = useCallback(() => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        setUserInformation(null);
        setIsLoggedIn(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn({ error, errorCode, errorMessage });
        setError(errorMessage);
      });
  }, [setError, setIsLoggedIn, setUserInformation, signOut]);

  useEffect(() => {
    initializeApp(firebaseConfig);
    setAppInitialized(true);
  }, []);

  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserInformation(user);
          setIsLoggedIn(true);
        } else {
          setUserInformation(null);
          setIsLoggedIn(false);
        }

        setIsLoading(false);
      });
    }
  }, [appInitialized]);

  if (isLoading) return null;

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        logoutUserFunction={logoutUserFunction}
      ></Header>
      <Component
        {...pageProps}
        createUserFunction={createUserFunction}
        isLoggedIn={isLoggedIn}
        loginUserFunction={loginUserFunction}
        userInformation={userInformation}
      />
      <p>{error}</p>
    </>
  );
}
