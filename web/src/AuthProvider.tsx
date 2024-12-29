import React from "react";
import { fakeAuthProvider } from "./Server";
import { Navigate, useLocation } from "react-router-dom";
import { log } from "./utils/Log";

export enum AUTH_TYPE {
  ADMIN, PARTNER, MERCHANT
}

interface AuthContextType {
  admin: any;
  partner: any;
  signin: (user: string, userType: AUTH_TYPE, callback: Function) => void;
  signout: (userType: AUTH_TYPE, callback: Function) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [admin, setAdmin] = React.useState<any>(null);
  let [partner, setPartner] = React.useState<any>(null);

  let signin = (newUser: string, userType: AUTH_TYPE, callback: Function) => {
    return fakeAuthProvider.signin(userType, () => {
      log('signin', userType)
      if (userType === AUTH_TYPE.ADMIN)
        setAdmin(newUser);
      else if (userType === AUTH_TYPE.PARTNER)
        setPartner(newUser);
      callback();
    });
  };

  let signout = (userType: AUTH_TYPE, callback: Function) => {
    return fakeAuthProvider.signout(userType, () => {
      log('signout', userType)
      if (userType === AUTH_TYPE.ADMIN)
        setAdmin(null);
      else if (userType === AUTH_TYPE.PARTNER)
        setPartner(null);
      callback();
    });
  };

  let value = { admin: admin, partner: partner, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.admin) {
    // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

export function RequireAuthPartner({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.partner) {
    // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
    return <Navigate to="/partners/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthProvider