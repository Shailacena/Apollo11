import './App.css'
import MainLayout from './MainLayout'
import PartnersMainLayout from './partners/MainLayout'
import Dashboard from './Dashboard'
import Admin from './Admin'
import PartnersOrders from './partners/Orders'
import PartnersCashFlow from './partners/CashFlow'
import PartnersLogin from './partners/Login'
import Login from './Login'
import PartnersHome from './partners/Home'

function App() {
  return (
    <>
      <PartnersMainLayout>
        <PartnersHome />
      </PartnersMainLayout>
    </>
  )
}

export default App
