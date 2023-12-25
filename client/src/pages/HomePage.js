import React, { useCallback, useContext, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { StateContext } from "../context/StateContext";
import { observer } from "mobx-react-lite";
import products from "../store/products";

export const HomePage = observer(() => {
  // const [products, setProducts] = useState()
  const { request } = useHttp()
  const { token } = useContext(AuthContext)
  const { categories } = useContext(StateContext)
  const [productList, setProductList] = useState()

  const fetchProducts = useCallback(async () => {
    try {
      const fetched = await request('/api/product', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      products.setCategoriesList(fetched)
    }
    catch (e) {}
  }, [token, request] )

  useEffect(() => {
    if (!products.categoriesList.length) fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    if (products.categoriesList) {
      let prod = products.categoriesList.map(product => {
        let url = "/product/category/" + product
        return (
          <li key={product} style={{listStyleType: 'none', padding: '10px'}}>
              <Link to={url} >
                <Button style={{width: '100%'}} label={ products.getCategoryName(product) } icon="pi pi-check" />
              </Link>
          </li>
        )
      })
      setProductList(prod)
    }
  }, [products.categoriesList])


  return (
    <div>
      <h1>HomePage</h1>
      <ul>
        { productList }
      </ul>
    </div>
  )
})
