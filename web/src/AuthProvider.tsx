import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { adminLogin, AdminLoginReq, merchantLogin, MerchantLoginReq, partnerLogin, PartnerLoginReq } from "./api/api";
import { getCookiePath, getExpirationDate } from "./utils/Tool";

const TAG = 'AuthProvider';

export enum AUTH_TYPE {
  ADMIN, PARTNER, MERCHANT
}

interface AuthContextType {
  token: any;
  name: any;

  adminSignin: (value: AdminLoginReq, callback: Function) => void;
  adminSignout: (callback: Function) => void;

  partnerSignin: (value: PartnerLoginReq, callback: Function) => void;
  partnerSignout: (callback: Function) => void;

  merchantSignin: (value: MerchantLoginReq, callback: Function) => void;
  merchantSignout: (callback: Function) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [token, setToken] = React.useState<any>(null);
  let [name, setName] = React.useState<any>(null);

  let [cookies, setCookie, removeCookie] = useCookies(['token', 'name']);

  useEffect(() => {
    console.log('icccc =====> authprovider useEffect')
  }, []);

  let adminSignin = async (value: AdminLoginReq, callback: Function) => {
    const resp = await adminLogin(value)
    console.log(resp);
    setToken(resp.token)
    setName(resp.nickname);
    console.log(TAG, 'adminSignin iccccccccccccccccccc token', token)
    setCookie('token', resp.token, { path: '/admin/', expires: getExpirationDate(7) });
    setCookie('name', resp.nickname, { path: '/admin/', expires: getExpirationDate(7) });
    callback()
  };

  let adminSignout = (callback: Function) => {
    removeCookie('token', { path: '/admin/' })
    removeCookie('name', { path: '/admin/' })
    setName(null);
    callback();
  };

  let partnerSignin = async (value: PartnerLoginReq, callback: Function) => {
    const resp = await partnerLogin(value)
    console.log(resp);
    setToken(resp.token)
    setName(resp.name);
    setCookie('token', resp.token, { path: '/partner/', expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) });
    setCookie('name', resp.name, { path: '/partner/', expires: getExpirationDate(7) });
    callback()
  };

  let partnerSignout = (callback: Function) => {
    removeCookie('token', { path: '/partner/' })
    removeCookie('name', { path: '/partner/' })
    setName(null);
    callback();
  };

  let merchantSignin = async (value: MerchantLoginReq, callback: Function) => {
    const resp = await merchantLogin(value)
    console.log(resp);
    setToken(resp.token)
    setName(resp.name);
    setCookie('token', resp.token, { path: '/merchant/', expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) });
    setCookie('name', resp.name, { path: '/merchant/', expires: getExpirationDate(7) });
    callback()
  };

  let merchantSignout = (callback: Function) => {
    removeCookie('token', { path: '/merchant/' })
    removeCookie('name', { path: '/merchant/' })
    setName(null);
    callback();
  };

  let value = { token, name, adminSignin, adminSignout, partnerSignin, partnerSignout, merchantSignin, merchantSignout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  let [cookies] = useCookies(['token']);

  console.log(TAG, 'RequireAuth iccccccccccccccccccc auth.token', auth.token)
  console.log(TAG, 'RequireAuth iccccccccccccccccccc cookies token ', cookies.token)

  // 已登陆
  if (auth.token) {
    return children;
  } else if (cookies.token) {
    auth.token = cookies.token
    return children;
  }

  // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
  return <Navigate to="/admin/login" state={{ from: location }} replace />;
}

export function RequireAuthPartner({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  let [cookies] = useCookies(['token']);

  console.log(TAG, location.pathname)
  console.log(TAG, 'RequireAuthPartner iccccccccccccccccccc auth.token', auth.token)
  console.log(TAG, 'RequireAuthPartner iccccccccccccccccccc cookies token ', cookies.token)

  // 已登陆
  if (auth.token) {
    return children;
  } else if (cookies.token) {
    auth.token = cookies.token
    return children;
  }

  // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
  return <Navigate to="/partner/login" state={{ from: location }} replace />;
}

export function RequireAuthMerchant({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  let [cookies] = useCookies(['token']);

  console.log(TAG, location.pathname)
  console.log(TAG, 'RequireAuthMerchant iccccccccccccccccccc auth.token', auth.token)
  console.log(TAG, 'RequireAuthMerchant iccccccccccccccccccc cookies token ', cookies.token)

  // 已登陆
  if (auth.token) {
    return children;
  } else if (cookies.token) {
    auth.token = cookies.token
    return children;
  }

  // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
  return <Navigate to="/merchant/login" state={{ from: location }} replace />;
}

export default AuthProvider