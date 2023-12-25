import { useState } from 'react'

export const useAppState = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [addDialogVisible, setAddDialogVisible] = useState(false)
  const [_id, set_Id] = useState("")
  const [title, setTitle] = useState("")
  const [productId, setProductId] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [country, setCountry] = useState("")
  const [price, setPrice] = useState("")
  const [img, setImg] = useState("")
  // const [categories, setCategories] = useState({})
  const categories = [
    { code: 'cable', name: 'Кабельная продукция' },
    { code: 'pipe', name: 'Гофра и труба' },
    { code: 'box', name: 'Электромонтажные коробки' },
    { code: 'frame', name: 'Корпуса, щитки' },
    { code: 'automation', name: 'Автоматика' },
    { code: 'socket', name: 'Розетки, выключатели' },
    { code: 'lighting', name: 'Светотехника' },
    { code: 'insulation', name: 'Изоляция' }
  ]

  const clearState = () => {
    set_Id("")
    setTitle("")
    setProductId("")
    setCategory("")
    setDescription("")
    setManufacturer("")
    setCountry("")
    setPrice("")
    setImg("")
  }

  return { isLoading, setIsLoading, addDialogVisible, setAddDialogVisible, _id, set_Id, title, setTitle, productId, setProductId, category, setCategory,
    description, setDescription, manufacturer, setManufacturer, country, setCountry, price, setPrice, img, setImg, categories, clearState }
}
