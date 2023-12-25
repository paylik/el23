import { createContext } from 'react'

export const StateContext = createContext({
  isLoading: false,
  addDialogVisible: false,
  _id: "",
  title: "",
  productId: "",
  category: "",
  description: "",
  manufacturer: "",
  country: "",
  price:  "",
  img: ""
})
