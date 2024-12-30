import React from "react";
import { fakeAuthProvider } from "./Server";
import { Navigate, useLocation } from "react-router-dom";
import { log } from "./utils/Log";
import { useCookies } from "react-cookie";

export enum AUTH_TYPE {
  ADMIN, PARTNER, MERCHANT
}

interface AuthContextType {
  admin: any;
  partner: any;
  signin: (account: string, password: string, userType: AUTH_TYPE, code: string, callback: Function) => void;
  signout: (callback: Function) => void;
  checkToken: (userType: AUTH_TYPE, token: string, callback: Function) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [admin, setAdmin] = React.useState<any>(null);
  let [partner, setPartner] = React.useState<any>(null);
  let [cookies, setCookie, removeCookie] = useCookies(['token']);

  let signin = (account: string, password: string, userType: AUTH_TYPE, code: string, callback: Function) => {
    let params = {account, password, userType, code}
    return fakeAuthProvider.signin(params, (data: {account: string, userType: AUTH_TYPE}, token: string) => {
      log('signin', data.userType)
      if (data.userType === AUTH_TYPE.ADMIN){
        setAdmin(data);
        setCookie('token', token);
      }else if (data.userType === AUTH_TYPE.PARTNER)
        setPartner(data);
        setCookie('token', token);
      callback();
    });
  };

  let signout = (callback: Function) => {
    return fakeAuthProvider.signout(admin, () => {
      log('signout', admin.userType)
      if (admin.userType === AUTH_TYPE.ADMIN){
        removeCookie('token')
        setAdmin(null);
      }else if (admin.userType === AUTH_TYPE.PARTNER){
        removeCookie('token')
        setPartner(null);
      }
      callback();
    });
  };

  let checkToken = (userType: AUTH_TYPE, token: string, callback: Function) => {
    return fakeAuthProvider.checkToken(userType, token, (backUserType: AUTH_TYPE) => {
      log('checkToken', backUserType)
      if (backUserType === AUTH_TYPE.ADMIN){
        removeCookie('token')
        setAdmin(null);
      }else if (backUserType === AUTH_TYPE.PARTNER){
        removeCookie('token')
        setPartner(null);
      }
      callback();
    });
  };

  let value = { admin: admin, partner: partner, signin, signout, checkToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  let [cookies] = useCookies(['token']);

  // 已登陆
  if (auth.admin) {
    return children;
  }

  // cookie登陆
  if (cookies.token) {
    auth.checkToken(AUTH_TYPE.ADMIN, cookies.token, ()=>{});
    return;
  }

  // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
  return <Navigate to="/admin/login" state={{ from: location }} replace />;
}

export function RequireAuthPartner({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  let [cookies] = useCookies(['token']);
  
  // 已登陆
  if (auth.admin) {
    return children;
  }

  // cookie登陆
  if (cookies.token) {
    auth.checkToken(AUTH_TYPE.PARTNER, cookies.token, ()=>{});
    return;
  }

  // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
  return <Navigate to="/partners/login" state={{ from: location }} replace />;
}

export default AuthProvider