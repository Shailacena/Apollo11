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
  signout: (admin: any, callback: Function) => void;
  checkToken: (userType: AUTH_TYPE, token: string, callback: Function) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [admin, setAdmin] = React.useState<any>(null);
  let [partner, setPartner] = React.useState<any>(null);
  let [cookies, setCookie, removeCookie] = useCookies(['token', ]);

  let signin = (account: string, password: string, userType: AUTH_TYPE, code: string, callback: Function) => {
    let params = {account, password, userType, code}
    return fakeAuthProvider.signin(params, (data: {account: string, userType: AUTH_TYPE}, token: string) => {
      console.log('signin', data.userType, data)
      if (data.userType === AUTH_TYPE.ADMIN){
        setAdmin(data);
        setCookie('token', token, {path: '/admin/', expires: new Date(new Date().getTime() + 24*60*60)});
      }else if (data.userType === AUTH_TYPE.PARTNER) {
        setPartner(data);
        setCookie('token', token, {path: '/partners/', expires: new Date(new Date().getTime() + 24*60*60)});
      }
      callback()
    });
  };

  let signout = (admin: any, callback: Function) => {
    return fakeAuthProvider.signout(admin, () => {
      console.log('signout', admin.userType)
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
    return fakeAuthProvider.checkToken(userType, token, (data: {userType: AUTH_TYPE, account: string}) => {
      console.log('checkToken token:', userType, data, token)
      if (data.userType === AUTH_TYPE.ADMIN){
        if (data.account) {
          setAdmin(data);
        }
      }else if (data.userType === AUTH_TYPE.PARTNER){
        if (data.account) {
          setPartner(data);
        }
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

  console.log('RequireAuth iccccccccccccccccccc admin', auth.admin)
  console.log('RequireAuth iccccccccccccccccccc token ', cookies.token)

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
  
  console.log('RequireAuthPartner iccccccccccccccccccc admin', auth.partner)
  console.log('RequireAuthPartner iccccccccccccccccccc token ', cookies.token)

  // 已登陆
  if (auth.partner) {
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