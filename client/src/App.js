import 'primereact/resources/themes/soho-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { StateContext } from "./context/StateContext";
import { useAppState } from "./hooks/state.hook";
import { AddProductDialog } from "./components/AddProduct";

function App() {
  const {token, login, logout, userId, isAdmin, cart, addToCart, removeFromCart} = useAuth()
  const {
    isLoading,
    setIsLoading,
    addDialogVisible,
    setAddDialogVisible,
    _id,
    set_Id,
    title,
    setTitle,
    productId,
    setProductId,
    category,
    setCategory,
    description,
    setDescription,
    manufacturer,
    setManufacturer,
    country,
    setCountry,
    price,
    setPrice,
    img,
    setImg,
    categories,
    clearState
  } = useAppState()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider
      value={{token, login, logout, userId, isAdmin, isAuthenticated, cart, addToCart, removeFromCart}}>
      <StateContext.Provider value={{
        isLoading,
        setIsLoading,
        addDialogVisible,
        setAddDialogVisible,
        _id,
        set_Id,
        title,
        setTitle,
        productId,
        setProductId,
        category,
        setCategory,
        description,
        setDescription,
        manufacturer,
        setManufacturer,
        country,
        setCountry,
        price,
        setPrice,
        img,
        setImg,
        categories,
        clearState
      }}>
        <BrowserRouter>
          <div>
            <Navbar/>
            <AddProductDialog/>
            {routes}
          </div>
        </BrowserRouter>
      </StateContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
