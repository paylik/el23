import { useState } from 'react'

export const useAppState = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [addDialogVisible, setAddDialogVisible] = useState(false)
  const [productId, setProductId] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [country, setCountry] = useState("")
  const [price, setPrice] = useState("")
  const [img, setImg] = useState("")

  return { isLoading, setIsLoading, addDialogVisible, setAddDialogVisible, productId, setProductId, category, setCategory,
    description, setDescription, manufacturer, setManufacturer, country, setCountry, price, setPrice, img, setImg }
}
