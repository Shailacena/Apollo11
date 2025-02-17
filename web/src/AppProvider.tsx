import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AdminLoginResp, IPartner, MerchantLoginResp, PartnerLoginResp } from "./api/types";
import { getExpirationDate } from "./utils/Tool";

const TAG = 'AppProvider';

export enum AUTH_TYPE {
  ADMIN, PARTNER, MERCHANT
}

enum CookieFiled {
  Token = 'token',
  Nickname = 'nickname',
  Role = 'role',
  ID = 'id',
  LEVEL = 'level'
}

interface Cookie {
  token?: string
  nickname?: string
  role?: number
  id?: any;
  level?: number;
}

interface AuthContextType {
  auth: {
    adminSignin: (value: AdminLoginResp, id: string, callback: Function) => void;
    adminSignout: (callback: Function) => void;

    partnerSignin: (value: PartnerLoginResp, id: number, callback: Function) => void;
    partnerSignout: (callback: Function) => void;

    merchantSignin: (value: MerchantLoginResp, id: number, callback: Function) => void;
    merchantSignout: (callback: Function) => void;
  }
  cookie: Cookie;

  partnerList: IPartner[];
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function useAppContext() {
  return React.useContext(AuthContext);
}

function AppProvider({ children }: { children: React.ReactNode }) {
  // let [token, setToken] = React.useState<any>(null);
  // let [name, setName] = React.useState<any>(null);
  // let [id, setID] = React.useState<any>(null);
  // let [level, setLevel] = React.useState(0);
  let [partnerList] = React.useState<any>(null);

  let [cookie, setCookie, removeCookie] = useCookies([CookieFiled.Token, CookieFiled.Nickname, CookieFiled.Role, CookieFiled.ID, CookieFiled.LEVEL]);

  const adminPath = '/admin'
  const partnerPath = '/partner'
  const merchantPath = '/merchant'

  useEffect(() => {
    console.log('icccc =====> AppProvider useEffect')
  }, []);

  let adminSignin = async (data: AdminLoginResp, id: string, callback: Function) => {
    console.log(data);
    let exp = getExpirationDate(7)
    setCookie(CookieFiled.Token, data.token, { path: adminPath, expires: exp });
    setCookie(CookieFiled.Nickname, data.nickname, { path: adminPath, expires: exp });
    setCookie(CookieFiled.Role, data.role, { path: adminPath, expires: exp });
    setCookie(CookieFiled.ID, id, { path: adminPath, expires: exp });
    setCookie(CookieFiled.LEVEL, 0, { path: adminPath, expires: exp });
    callback()
  };

  let adminSignout = (callback: Function) => {
    removeCookie(CookieFiled.Token, { path: adminPath })
    removeCookie(CookieFiled.Nickname, { path: adminPath })
    removeCookie(CookieFiled.Role, { path: adminPath })
    removeCookie(CookieFiled.ID, { path: adminPath })
    removeCookie(CookieFiled.LEVEL, { path: adminPath })

    callback();
  };

  let partnerSignin = async (data: PartnerLoginResp, id: number, callback: Function) => {
    console.log(data);
    let exp = getExpirationDate(7)
    setCookie(CookieFiled.Token, data.token, { path: partnerPath, expires: exp });
    setCookie(CookieFiled.Nickname, data.name, { path: partnerPath, expires: exp });
    setCookie(CookieFiled.ID, id, { path: partnerPath, expires: exp });
    setCookie(CookieFiled.LEVEL, 0, { path: partnerPath, expires: exp });
    callback()
  };

  let partnerSignout = (callback: Function) => {
    removeCookie(CookieFiled.Token, { path: partnerPath })
    removeCookie(CookieFiled.Nickname, { path: partnerPath })
    removeCookie(CookieFiled.ID, { path: partnerPath })
    removeCookie(CookieFiled.LEVEL, { path: partnerPath })
    callback();
  };

  let merchantSignin = async (data: MerchantLoginResp, id: number, callback: Function) => {
    console.log(data);
    let exp = getExpirationDate(7)
    setCookie(CookieFiled.Token, data.token, { path: merchantPath, expires: exp });
    setCookie(CookieFiled.Nickname, data.name, { path: merchantPath, expires: exp });
    setCookie(CookieFiled.ID, id, { path: merchantPath, expires: exp });
    setCookie(CookieFiled.LEVEL, 0, { path: merchantPath, expires: exp });
    callback()
  };

  let merchantSignout = (callback: Function) => {
    removeCookie(CookieFiled.Token, { path: merchantPath })
    removeCookie(CookieFiled.Nickname, { path: merchantPath })
    removeCookie(CookieFiled.ID, { path: merchantPath })
    removeCookie(CookieFiled.LEVEL, { path: merchantPath })
    callback();
  };

  let value = {
    auth: { adminSignin, adminSignout, partnerSignin, partnerSignout, merchantSignin, merchantSignout },
    cookie,
    partnerList,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  // let ctx = useAppContext();

  let location = useLocation();
  let [cookies] = useCookies([CookieFiled.Token]);

  // console.log(TAG, 'RequireAuth iccccccccccccccccccc auth', ctx)
  // console.log(TAG, 'RequireAuth iccccccccccccccccccc auth.token', ctx.auth.token)
  console.log(TAG, 'RequireAuth iccccccccccccccccccc cookies token ', cookies.token)

  // 已登陆
  if (cookies.token) {
    // ctx.auth.token = cookies.token
    return children;
  }

  // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
  return <Navigate to="/admin/login" state={{ from: location }} replace />;
}

export function RequireAuthPartner({ children }: { children: JSX.Element }) {
  // let ctx = useAppContext();
  let location = useLocation();
  let [cookies] = useCookies([CookieFiled.Token]);

  console.log(TAG, location.pathname)
  // console.log(TAG, 'RequireAuthPartner iccccccccccccccccccc auth.token', ctx.auth.token)
  console.log(TAG, 'RequireAuthPartner iccccccccccccccccccc cookies token ', cookies.token)

  // 已登陆
  if (cookies.token) {
    // ctx.auth.token = cookies.token
    return children;
  }

  // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
  return <Navigate to="/partner/login" state={{ from: location }} replace />;
}

export function RequireAuthMerchant({ children }: { children: JSX.Element }) {
  // let ctx = useAppContext();
  let location = useLocation();
  let [cookies] = useCookies([CookieFiled.Token]);

  console.log(TAG, location.pathname)
  // console.log(TAG, 'RequireAuthMerchant iccccccccccccccccccc auth.token', ctx.auth.token)
  console.log(TAG, 'RequireAuthMerchant iccccccccccccccccccc cookies token ', cookies.token)

  // 已登陆
  if (cookies.token) {
    return children;
  }

  // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
  return <Navigate to="/merchant/login" state={{ from: location }} replace />;
}

export default AppProvider