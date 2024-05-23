import React, { useContext, useEffect, useState } from "react"
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'
import logo from '../img/002.jpg'
import { Button } from "primereact/button";
// import { StateContext } from "../context/StateContext";
import { observer } from "mobx-react-lite";
import appState from "../store/appState";
import products from "../store/products";

export const Navbar = observer(() => {

  const auth = useContext(AuthContext)
  // const state = useContext(StateContext)
  const [loginItems, setLoginItems] = useState([
    {
      label: 'Домой',
      icon: 'pi pi-fw pi-home',
      command: () => navigate('/'),
    },
    {
      label: 'О нас',
      icon: 'pi pi-fw pi-info-circle',
      command: () => navigate('/about'),
    },
    {
      label: 'Доставка',
      icon: 'pi pi-fw pi-truck',
      command: () => navigate('/delivery'),
    },
    {
      label: 'Проект ',
      icon: 'pi pi-fw pi-server',
      command: () => navigate('/project'),
    },
    {
      label: 'Услуги электрика ',
      icon: 'pi pi-fw pi-wrench',
      url: 'http://electrician.nbacademy.ru/',
      target: '_blank'
    },
    {
      // label: `( ${ cart.length ?? cart.length } )  Корзина`,
      label: `Корзина`,
      icon: 'pi pi-fw pi-shopping-cart',
      command: () => navigate('/cart'),
    }
  ])
  const navigate = useNavigate()

  useEffect(() => {
    let i = [...loginItems]
    if (auth.cart && auth.cart.length) i[5].label = `( ${auth.cart.length} )  Корзина`
    setLoginItems([...i])
  }, [auth.cart])


  const items = [
    {
      label: 'Домой',
      icon: 'pi pi-fw pi-home',
      command: () => navigate('/'),
    },
    {
      label: 'О нас',
      icon: 'pi pi-fw pi-info-circle',
      command: () => navigate('/about'),
    },
    {
      label: 'Доставка',
      icon: 'pi pi-fw pi-truck',
      command: () => navigate('/delivery'),
    },
    {
      label: 'Проект ' +
        '',
      icon: 'pi pi-fw pi-server',
      command: () => navigate('/project'),
    },
    {
      label: 'Услуги электрика ',
      icon: 'pi pi-fw pi-wrench',
      url: 'http://electrician.nbacademy.ru/',
      target: '_blank'
    }
  ];

  const addProduct = () => {
    products.setProduct({})
    appState.setAddDialogVisible(true)
  }

  const start = <img alt="logo" src={logo} height="60" className="mx-4"></img>;
  const end =
    <div>
      <div className="flex">
        <InputText placeholder="Search" type="text" className="w-full"/>
        {auth.isAdmin &&
          <Button icon="pi pi-pencil" text raised severity="danger" onClick={addProduct}/>}
        {auth.isAuthenticated ?
          <Button label="Выход" icon="pi pi-power-off" text raised onClick={() => auth.logout()} className="pr-5"/>
          : <Button label="Войти" icon="pi pi-sign-in" text raised onClick={() => navigate('/cart')} className="pr-5"/>}
      </div>
    </div>

  return (
    <header>
      <div className="card">
        <Menubar model={auth.isAuthenticated ? loginItems : items} start={start} end={end}/>
      </div>
    </header>
  )
})
