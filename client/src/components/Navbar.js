import React, { useContext } from "react"
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'
import logo from '../img/001.png'
import { Button } from "primereact/button";

export const Navbar = () => {

  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const loginItems = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => navigate('/'),
    },
    {
      label: 'About Us',
      icon: 'pi pi-fw pi-info-circle',
      command: () => navigate('/about'),
    },
    {
      label: 'Delivery',
      icon: 'pi pi-fw pi-truck',
      command: () => navigate('/delivery'),
    },
    {
      label: 'Cart',
      icon: 'pi pi-fw pi-shopping-cart',
      command: () => navigate('/cart'),
    }
  ];

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => navigate('/'),
    },
    {
      label: 'About Us',
      icon: 'pi pi-fw pi-info-circle',
      command: () => navigate('/about'),
    },
    {
      label: 'Delivery',
      icon: 'pi pi-fw pi-truck',
      command: () => navigate('/delivery'),
    }
  ];

  const start = <img alt="logo" src={logo} height="40" className="mx-4"></img>;
  const end =
    <div className="flex">
      <InputText placeholder="Search" type="text" className="w-full" />
      { auth.isAdmin && <Button icon="pi pi-pencil" text raised severity="danger" /> }
      { auth.isAuthenticated ?
        <Button label="Quit" icon="pi pi-power-off" text raised onClick={ () => auth.logout() } className="pr-5" />
        : <Button label="Login" icon="pi pi-sign-in" text raised onClick={ () => navigate('/cart') } className="pr-5" /> }
    </div>

  return (
    <header>
      <div className="card">
        <Menubar model={auth.isAuthenticated ? loginItems : items} start={start} end={end} />
      </div>
    </header>
  )
}
