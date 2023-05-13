import { createContext } from 'react'

export const StateContext = createContext({
  isLoading: false,
  addDialogVisible: false,
  productId: "",
  category: "",
  description: "",
  manufacturer: "",
  country: "",
  price:  "",
  img: ""
})
