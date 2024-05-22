import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/AuthContext"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { ConfirmPopup } from "primereact/confirmpopup"
import no_image from "../img/no_image.png"
import products from "../store/products";
import appState from "../store/appState";
import { observer } from "mobx-react-lite";

export const ProductPage = observer(() => {

  const {request} = useHttp()
  const pageId = useParams().id
  const auth = useContext(AuthContext)
  // const toastTopCenter = useRef(null)
  // const state = useContext(StateContext)
  const [visible, setVisible] = useState(false)
  // const [url, setUrl] = useState("")
  // const [category, setCategory] = useState("")
  const buttonEl = useRef(null)
  const navigate = useNavigate()
  // const {categories} = useContext(StateContext)

  const download = useCallback(async () => {
    try {
      const fetched = await request(`/api/img/${products.product.productId}`, 'GET', null)
      if (fetched) products.setProductValue("img", fetched.data)
    } catch (e) {
      console.log("ERROR", e)
    }
  }, [request])

  const getProduct = useCallback(async () => {
    try {
      const fetched = await request(`/api/product/${pageId}`, 'GET', null)
      products.setProduct(fetched)
      await download()
    } catch (e) {
      navigate('/error')
      console.log("ERROR", e)
    }
  }, [pageId, request, navigate, download])

  useEffect(() => {
    console.log("DOWN")
    getProduct()

    //return products.setProduct({})
  }, [getProduct])

  const changeProduct = () => {
    appState.setAddDialogVisible(true)
  }

  const deleteProduct = async () => {
    setVisible(false)
    navigate(`/product/category/${products.product.category}`)
    try {
      const data = await request(`/api/product/delete/${pageId}`, 'DELETE')
      console.log("DATA", data)
      products.setCategory(products.categoryProducts.filter(p => p._id !== pageId))
      // toastTopCenter.current.show({
      //   severity: 'error', summary: data.message,
      //   detail: data.message, life: 3000
      // })
    } catch (e) {
      console.log("ERROR", e)
    }
  }

  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <h1> Цена {products.product.price} Бел.руб.</h1>
    </div>
  )


  return (
    <div>
      {/*<Toast ref={toastTopCenter} position="top-center"/>*/}
      <Link to={`/product/category/${products.product.category}`}>
        <Button style={{width: '100%'}} label={products.getCategoryName(products.product.category)} icon="pi pi-check"/>
      </Link>
      <div className="card md:flex justify-content-center">
        <img alt="Card" src={products.product.img || no_image} className="w-12 md:w-4 h-fit"/>
        <Card title={products.product.title} subTitle={products.getCategoryName(products.product.category)}
              footer={footer} className="w-12 md:w-8 md:mt-2">
          <pre><p className="m-0 overflow-auto white-space-normal">{products.product.description}</p></pre>
          <pre><p className="m-0">{products.product.properties}</p></pre>
        </Card>
      </div>
      {auth.token && <Button icon="pi pi-shopping-cart" label="Добавить в корзину" text raised severity="success"
                             onClick={() => auth.addToCart(products.product._id)}/>}
      {auth.isAdmin &&
        <div>
          <ConfirmPopup target={buttonEl.current} visible={visible} onHide={() => setVisible(false)}
                        message="Точно удалить?" icon="pi pi-exclamation-triangle" accept={deleteProduct}
                        reject={() => setVisible(false)}/>
          <Button ref={buttonEl} icon="pi pi-times" label="Удалить" text raised severity="danger"
                  onClick={() => setVisible(true)}/>
          <Button icon="pi pi-pencil" label="Изменить" text raised severity="success"
                  onClick={changeProduct}/>
        </div>
      }
    </div>
  )
})
