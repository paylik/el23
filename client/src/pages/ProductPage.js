import React, { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Card } from "primereact/card";

export const ProductPage = () => {

  const { token } = useContext(AuthContext)
  const { request } = useHttp()
  const pageId = useParams().id
  const [price, setPrice] = useState("")
  const [productId, setProductId] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [img, setImg] = useState("")

  const getProduct = useCallback( async () => {
    try {
      const fetched = await request(`/api/product/${pageId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setPrice(fetched.price)
      setProductId(fetched.productId)
      setCategory(fetched.category)
      setDescription(fetched.description)
      setImg(fetched.img)
    }
    catch (e) {}
  },[token, pageId, request, img])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <h1> Price {price} $</h1>
    </div>
  )

  return (
    <div className="card md:flex justify-content-center">
      <img alt="Card" src={img} className="w-12 md:w-4" />
      <Card title={ productId } subTitle={ category } footer={footer} className="w-12 md:w-8 md:mt-2">
        <pre><p className="m-0">{ description }</p></pre>
      </Card>
    </div>
  )
}
