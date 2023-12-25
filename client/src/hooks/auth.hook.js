import { useCallback, useEffect, useState } from 'react'
import { useHttp } from "./http.hook";

const storageName = 'userData'

export const useAuth = () => {
  const {request} = useHttp()
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [cart, setCart] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const login = useCallback((jwtToken, id, isAdmin, cart) => {
    setToken(jwtToken)
    setUserId(id)
    setIsAdmin(isAdmin)
    setCart(cart)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, isAdmin: isAdmin, cart: cart
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setIsAdmin(false)
    setCart(null)
    localStorage.removeItem(storageName)
  }, [])

  const updateLocalStorage = (r) => {
    const data = JSON.parse(localStorage.getItem(storageName))
    console.log("RRRRRRRRRRR", r)
    localStorage.setItem(storageName, JSON.stringify({
      userId: data.userId, token: data.token, isAdmin: data.isAdmin, cart: r.user.cart
    }))
    setCart(r.user.cart)
  }

  const addToCart = async (product, quantity) => {
    try {
      await request(
        `/api/auth/addToCart`,
        'PATCH',
        {_id: userId, product: product, quantity: quantity},
        {Authorization: `Bearer ${token}`}
      ).then((r) => updateLocalStorage(r))
    } catch (e) {
      console.log("ERROR", e)
    }
  }

  const removeFromCart = async (product) => {
    try {
      await request(
        `/api/auth/removeFromCart`,
        'PATCH',
        {_id: userId, product: product ? product.id : null},
        {Authorization: `Bearer ${token}`}
      ).then((r) => updateLocalStorage(r))
    } catch (e) {
      console.log("ERROR", e)
    }
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId, data.isAdmin, data.cart)
    }
  }, [login])

  return {login, logout, token, cart, addToCart, removeFromCart, userId, isAdmin}
}
