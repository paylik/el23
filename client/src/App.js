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
  const { token, login, logout, userId, isAdmin } = useAuth()
  const { isLoading, setIsLoading, addDialogVisible, setAddDialogVisible, productId, setProductId, category, setCategory,
    description, setDescription, manufacturer, setManufacturer, country, setCountry, price, setPrice, img, setImg } = useAppState()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAdmin, isAuthenticated }}>
      <StateContext.Provider value={{ isLoading, setIsLoading, addDialogVisible, setAddDialogVisible, productId, setProductId,
        category, setCategory, description, setDescription, manufacturer, setManufacturer, country, setCountry, price, setPrice, img, setImg }}>
        <BrowserRouter>
          <div className="m-4">
            <Navbar />
            <AddProductDialog />
            { routes }
          </div>
        </BrowserRouter>
      </StateContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
