import { AUTH_TYPE } from "./AuthProvider";

/**
 * 模拟了Server API
 */

const { v4: uuidv4} = require('uuid');
 
function generateToken() {
  return uuidv4();
}

const fakeAuthProvider = {
    isAuthenticated: false,
    token: '',
    signin(params: {account: string, password: string, userType: AUTH_TYPE, code: string}, callback: Function) {
      fakeAuthProvider.isAuthenticated = true;
      fakeAuthProvider.token = generateToken();
      setTimeout(callback({userType:params.userType, account: params.account}, fakeAuthProvider.token), 100); // fake async
    },
    signout(params: {account: string, userType: AUTH_TYPE}, callback: Function) {
      fakeAuthProvider.isAuthenticated = false;
      setTimeout(callback(), 100);
    },
    checkToken(userType: AUTH_TYPE, token: string, callback: Function) {
      if (fakeAuthProvider.token != '' && fakeAuthProvider.token == token) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback(userType, token), 100);
      } else {
        fakeAuthProvider.token = '';
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback(userType), 100);
      }
    }
  };
  
  export { fakeAuthProvider };
  