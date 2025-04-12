import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import CriptoDetails from "./pages/CriptoDetails"
import NotFound from "./pages/NotFound"

import Header from "./components/Header"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route 
          path="/"
          element={ <Home /> }
        />

        <Route 
          path="/cripto/:criptoId"
          element={ <CriptoDetails /> }
        />

        <Route 
          path="*"
          element={ <NotFound /> }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
