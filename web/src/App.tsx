import { BrowserRouter as Router, Route, Routes, Outlet, useLocation, Navigate, useNavigate, BrowserRouter } from 'react-router-dom'
import './App.css'
import AuthProvider, { RequireAuth, RequireAuthPartner } from './AuthProvider'
import MainLayout from './admin/MainLayout'
import Login from './admin/Login'
import LoginPartner from './partners/Login'
import MainLayoutPartner from './partners/MainLayout'
import { getRouteConfig, IRoute } from './partners/RouteConfigs'
import { routes } from './admin/routes'

// import MainLayout from './MainLayout'

function App() {
  return (
    // <>
    //   <MainLayout />
    // </>

    <AuthProvider>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/partners/login" element={<LoginPartner />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          {routes.map((r: IRoute) => {
            let route = r?.children ? r.children.map((childRoute: IRoute) => (
              <Route key={r.path + childRoute.path} path={r.path + childRoute.path} element={<childRoute.component />} />
            )) : <Route key={r.path} path={r.path} element={<r.component />} />
            console.log(route)
            return route
          })}
        </Route>

        <Route
          path="/partners"
          element={
            <RequireAuthPartner>
              <MainLayoutPartner />
            </RequireAuthPartner>
          }
        >
          {getRouteConfig().map((r: IRoute) => {
            let route = r?.children ? r.children.map((childRoute: IRoute) => (
              <Route key={r.path + childRoute.path} path={r.path + childRoute.path} element={<childRoute.component />} />
            )) : <Route key={r.path} path={r.path} element={<r.component />} />
            console.log('App routes', route)
            return route
          })}
        </Route>

      </Routes>
    </AuthProvider>
  )
}

export default App
