import 'primereact/resources/themes/soho-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { AddProductDialog } from "./components/AddProduct";
import { Footer } from "./components/Footer";

function App() {
  const {token, login, logout, userId, isAdmin, cart, addToCart, removeFromCart} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider
      value={{token, login, logout, userId, isAdmin, isAuthenticated, cart, addToCart, removeFromCart}}>
      <BrowserRouter>
        <div className="w-10 m-auto pt-3">
          <Navbar/>
          <AddProductDialog/>
          {routes}
          <Footer/>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
