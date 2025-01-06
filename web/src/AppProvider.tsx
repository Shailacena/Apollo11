import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { adminLogin, AdminLoginReq, IPartner, merchantLogin, MerchantLoginReq, partnerLogin, PartnerLoginReq } from "./api/api";
import { getExpirationDate } from "./utils/Tool";

const TAG = 'AppProvider';

export enum AUTH_TYPE {
  ADMIN, PARTNER, MERCHANT
}

interface AuthContextType {
  auth: {
    token: any;
    name: any;

    adminSignin: (value: AdminLoginReq, callback: Function) => void;
    adminSignout: (callback: Function) => void;

    partnerSignin: (value: PartnerLoginReq, callback: Function) => void;
    partnerSignout: (callback: Function) => void;

    merchantSignin: (value: MerchantLoginReq, callback: Function) => void;
    merchantSignout: (callback: Function) => void;
  }

  partnerList: IPartner[];
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function useAppContext() {
  return React.useContext(AuthContext);
}

function AppProvider({ children }: { children: React.ReactNode }) {
  let [token, setToken] = React.useState<any>(null);
  let [name, setName] = React.useState<any>(null);
  let [partnerList, setPartnerList] = React.useState<any>(null);

  let [cookies, setCookie, removeCookie] = useCookies(['token', 'name']);

  console.log(setPartnerList, cookies);

  useEffect(() => {
    console.log('icccc =====> AppProvider useEffect')
  }, []);

  let adminSignin = async (value: AdminLoginReq, callback: Function) => {
    const {data} = await adminLogin(value)
    console.log(data);
    setToken(data.token)
    setName(data.nickname);
    console.log(TAG, 'adminSignin iccccccccccccccccccc token', token)
    setCookie('token', data.token, { path: '/admin', expires: getExpirationDate(7) });
    setCookie('name', data.nickname, { path: '/admin', expires: getExpirationDate(7) });
    callback()
  };

  let adminSignout = (callback: Function) => {
    removeCookie('token', { path: '/admin' })
    removeCookie('name', { path: '/admin' })
    setToken(null)
    setName(null);
    callback();
  };

  let partnerSignin = async (value: PartnerLoginReq, callback: Function) => {
    const {data} = await partnerLogin(value)
    console.log(data);
    setToken(data.token)
    setName(data.name);
    setCookie('token', data.token, { path: '/partner', expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) });
    setCookie('name', data.name, { path: '/partner', expires: getExpirationDate(7) });
    callback()
  };

  let partnerSignout = (callback: Function) => {
    removeCookie('token', { path: '/partner' })
    removeCookie('name', { path: '/partner' })
    setToken(null)
    setName(null);
    callback();
  };

  let merchantSignin = async (value: MerchantLoginReq, callback: Function) => {
    const {data} = await merchantLogin(value)
    console.log(data);
    setToken(data.token)
    setName(data.name);
    setCookie('token', data.token, { path: '/merchant', expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) });
    setCookie('name', data.name, { path: '/merchant', expires: getExpirationDate(7) });
    callback()
  };

  let merchantSignout = (callback: Function) => {
    removeCookie('token', { path: '/merchant' })
    removeCookie('name', { path: '/merchant' })
    setToken(null)
    setName(null);
    callback();
  };

  // let value = { token, name, adminSignin, adminSignout, partnerSignin, partnerSignout, merchantSignin, merchantSignout };
  let value = {
      auth: { token, name, adminSignin, adminSignout, partnerSignin, partnerSignout, merchantSignin, merchantSignout },
      partnerList,
    }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let ctx = useAppContext();

  let location = useLocation();
  let [cookies] = useCookies(['token']);

  console.log(TAG, 'RequireAuth iccccccccccccccccccc auth', ctx)
  console.log(TAG, 'RequireAuth iccccccccccccccccccc auth.token', ctx.auth.token)
  console.log(TAG, 'RequireAuth iccccccccccccccccccc cookies token ', cookies.token)

  // 已登陆
  if (ctx.auth.token) {
    return children;
  } else if (cookies.token) {
    ctx.auth.token = cookies.token
    return children;
  }

  // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
  return <Navigate to="/admin/login" state={{ from: location }} replace />;
}

export function RequireAuthPartner({ children }: { children: JSX.Element }) {
  let ctx = useAppContext();
  let location = useLocation();
  let [cookies] = useCookies(['token']);

  console.log(TAG, location.pathname)
  console.log(TAG, 'RequireAuthPartner iccccccccccccccccccc auth.token', ctx.auth.token)
  console.log(TAG, 'RequireAuthPartner iccccccccccccccccccc cookies token ', cookies.token)

  // 已登陆
  if (ctx.auth.token) {
    return children;
  } else if (cookies.token) {
    ctx.auth.token = cookies.token
    return children;
  }

  // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
  return <Navigate to="/partner/login" state={{ from: location }} replace />;
}

export function RequireAuthMerchant({ children }: { children: JSX.Element }) {
  let ctx = useAppContext();
  let location = useLocation();
  let [cookies] = useCookies(['token']);

  console.log(TAG, location.pathname)
  console.log(TAG, 'RequireAuthMerchant iccccccccccccccccccc auth.token', ctx.auth.token)
  console.log(TAG, 'RequireAuthMerchant iccccccccccccccccccc cookies token ', cookies.token)

  // 已登陆
  if (ctx.auth.token) {
    return children;
  } else if (cookies.token) {
    ctx.auth.token = cookies.token
    return children;
  }

  // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
  return <Navigate to="/merchant/login" state={{ from: location }} replace />;
}

export default AppProvider