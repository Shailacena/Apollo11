import { BrowserRouter as Router, Route, Routes, Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import React from 'react'
import AuthProvider, { RequireAuth, RequireAuthPartner } from './AuthProvider'
import MainLayout from './MainLayout'
import Login from './Login'
import LoginPartner from './partners/Login'
import MainLayoutPartner from './partners/MainLayout'
import { IRoute, RouteConfigs } from './partners/RouteConfigs'

// import MainLayout from './MainLayout'

function App() {
  return (
    // <>
    //   <MainLayout />
    // </>

    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/partners/login" element={<LoginPartner />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        />

          <Route
            path="/partners"
            element={
              <RequireAuthPartner>
                <MainLayoutPartner />
              </RequireAuthPartner>
            }
          >
            {RouteConfigs.map((r: IRoute) => {
              let route = r?.children ? r.children.map((childRoute: IRoute) => (
                <Route key={r.path + childRoute.path} path={r.path + childRoute.path} element={<childRoute.component />} />
              )) : <Route key={r.path} path={r.path} element={<r.component />} />
              console.log(route)
              return route
            })}

          </Route>

      </Routes>
    </AuthProvider>
  )
}

export default App
