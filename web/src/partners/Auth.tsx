import { createContext } from "react";

/**
 * 模拟了通用的auth API, 比如 Firebase.
 */
const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = true;
      setTimeout(callback, 100); // fake async
    },
    signout(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = false;
      setTimeout(callback, 100);
    }
  };
  
  export { fakeAuthProvider };
  