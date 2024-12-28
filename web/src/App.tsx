import { BrowserRouter as Router, Route, Routes, BrowserRouter, Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import MainLayout from './partners/MainLayout'
import { PrivateRoute, PublicRoute } from './RouteComponents'
import PartnerLogin from './partners/Login'
import PartnerDashboard from './partners/Dashboard'
import React from 'react'
import { fakeAuthProvider } from './partners/Auth'
import Dashboard from './partners/Dashboard'
import Orders from './partners/Orders'
import Login from './partners/Login'
import { IRoute, RouteConfigs } from './partners/RouteConfigs'
import AuthContext, { AuthProvider } from './partners/AuthContext'

// import MainLayout from './MainLayout'

function App() {
  return (
    // <>
    //   <MainLayout />
    // </>

    <AuthProvider>
      <Routes>
        {/* <Route element={<Layout />}> */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <MainLayout />
              </RequireAuth>
            }
          />
          {/* {RouteConfigs.map((r: IRoute) => {
            return r?.children ? r.children.map((childRoute: IRoute) => (
              <Route key={r.path + childRoute.path} path={r.path + childRoute.path} element={<RequireAuth><childRoute.component /></RequireAuth>} />
            )) : <Route key={r.path} path={r.path} element={<RequireAuth><r.component /></RequireAuth>} />
          })} */}
        {/* </Route> */}
      </Routes>
    </AuthProvider>
  )

  function Layout() {
    return (
      <div>
        <MainLayout />
        <Outlet />
      </div>
    );
  }

  function useAuth() {
    return React.useContext(AuthContext);
  }

  function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
      // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  }
}

export default App
