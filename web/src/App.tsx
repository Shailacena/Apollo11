import './App.css'
import MainLayout from './MainLayout'
import PartnersMainLayout from './partners/MainLayout'
import Dashboard from './Dashboard'
import Admin from './Admin'
import PartnersOrders from './partners/Orders'
import PartnersCashFlow from './partners/CashFlow'
import PartnersLogin from './partners/Login'
import Login from './Login'

function App() {
  return (
    <>
      {/* <PartnersMainLayout> */}
        <PartnersLogin />
      {/* </PartnersMainLayout> */}
    </>
  )
}

export default App
