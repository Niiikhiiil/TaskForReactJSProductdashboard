import React from 'react'
import DashBoard from './pages/DashBoard/DashBoard'
import Header from './components/Header/Header'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (<>
    <ToastContainer />
    <Header />
    <DashBoard />
  </>
  )
}

export default App