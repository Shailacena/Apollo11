import { AUTH_TYPE } from "./AuthProvider";

/**
 * 模拟了Server API
 */
const fakeAuthProvider = {
    isAuthenticated: false,
    signin(userType: AUTH_TYPE, callback: Function) {
      fakeAuthProvider.isAuthenticated = true;
      setTimeout(callback(userType), 100); // fake async
    },
    signout(userType: AUTH_TYPE, callback: Function) {
      fakeAuthProvider.isAuthenticated = false;
      setTimeout(callback(userType), 100);
    }
  };
  
  export { fakeAuthProvider };
  