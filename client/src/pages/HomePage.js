import React, { useCallback, useContext, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { observer } from "mobx-react-lite";
import products from "../store/products";
import { ProgressSpinner } from "primereact/progressspinner";

export const HomePage = observer(() => {
  // const [products, setProducts] = useState()
  const {request, loading} = useHttp()
  const {token} = useContext(AuthContext)
  // const { categories } = useContext(StateContext)
  const [productList, setProductList] = useState()

  useEffect(() => updateProductList(products.categoriesList), [])

  const fetchProducts = useCallback(async () => {
    try {
      const fetched = await request('/api/product', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      updateProductList(fetched)
      products.setCategoriesList(fetched)
    } catch (e) {
    }
  }, [token, request])

  useEffect(() => {
    if (!products.categoriesList.length) fetchProducts()
  }, [fetchProducts])

  const updateProductList = (list) => {
    setProductList(list.map(product => {
      let url = "/product/category/" + product
      return (
        <li key={product} style={{listStyleType: 'none', padding: '10px'}}>
          <Link to={url}>
            <Button style={{width: '100%'}} label={products.getCategoryName(product)} icon="pi pi-check"/>
          </Link>
        </li>
      )
    }))
  }

  return (
    <div className="md:px-6">
      <h1 className="text-center">Интернет витрина магазина электрики</h1>
      {loading ? <div className="card flex justify-content-center">
        <ProgressSpinner/>
      </div> : <ul className="m-auto md:px-6">
        {productList}
      </ul>}
    </div>
  )
})
