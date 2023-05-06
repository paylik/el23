import 'primereact/resources/themes/soho-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";

function App() {
  const { token, login, logout, userId, isAdmin } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAdmin, isAuthenticated }}>
      <BrowserRouter>
        <div className="m-4">
          <Navbar />
          { routes }
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
