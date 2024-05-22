import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
import { useHttp } from "../hooks/http.hook";
import { Link, useParams } from "react-router-dom";
import { DataView } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import no_image from "../img/no_image.png"
import { observer } from "mobx-react-lite";
import products from "../store/products";
import { AuthContext } from "../context/AuthContext";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";


export const CategoryPage = observer(() => {
    const {request, loading} = useHttp()
    const pageCategory = useParams().category
    // const state = useContext(StateContext)
    const auth = useContext(AuthContext)
    // const title = state.categories.find(cat => cat.code === pageCategory)
    const [sortField, setSortField] = useState('')
    const [sortOrder, setSortOrder] = useState(0)
    const [sortKey, setSortKey] = useState('')
    const sortOptions = [
      {label: 'Названию', value: 'title'},
      {label: 'Цена с высокой', value: '!price'},
      {label: 'Цена с низкой', value: 'price'}
    ]
    const toastTopCenter = useRef(null);

    const fetchProducts = useCallback(async () => {

      if (pageCategory === products.categoryName) return
      else {
        products.setCategoryName(pageCategory)
        try {
          const fetched = await request(`/api/product/category/${pageCategory}`, 'GET', null)
          products.setCategory(fetched)
          console.log("Category", fetched)
        } catch (e) {
        }
      }

    }, [pageCategory, request])

    useEffect(() => {
      fetchProducts()
      // return products.setCategory([])
    }, [fetchProducts])

    // useEffect(() => {
    //   if (products) {
    //     let prod = category.cat.map(product => {
    //       return (
    //         <li key={product._id}>
    //           <Link to={`/product/${product._id}`}>
    //             {product.productId}
    //           </ Link>
    //         </li>
    //       )
    //     })
    //     setProductList(prod)
    //   }
    // }, [category.cat])

    const onSortChange = (event) => {
      const value = event.value;

      if (value.indexOf('!') === 0) {
        setSortOrder(-1);
        setSortField(value.substring(1, value.length));
        setSortKey(value);
      } else {
        setSortOrder(1);
        setSortField(value);
        setSortKey(value);
      }
    }

    const addToCart = (product, ref) => {
      if (auth.token) {
        auth.addToCart(product)
        ref.current.show({
          severity: 'info', summary: 'Товар добавлен в корзину',
          detail: 'Товар добавлен в корзину', life: 3000
        })
      } else {
        ref.current.show({
          severity: 'error', summary: 'Товар могут добавлять только зарегистрированные пользователи',
          detail: 'Товар могут добавлять только зарегистрированные пользователи', life: 3000
        })
      }
    }

    const header = () => {
      return <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Сортировать"
                       onChange={onSortChange} className="w-full sm:w-14rem"/>
    }

    const itemTemplate = (product) => {
      let img = product.img || no_image
      return (
        <div className="col-12">
          <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
            <img className="w-5 sm:w-10rem xl:w-7rem shadow-2 block xl:block mx-auto border-round" src={img}
                 alt={product.name}/>
            <div
              className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
              <div className="flex flex-column align-items-center sm:align-items-start gap-3"
                   onClick={() => products.setProduct(product)}>
                <Link to={`/product/${product._id}`}>
                  <div className="text-2xl font-bold text-900">{product.title}</div>
                </ Link>
              </div>
              <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                <span className="text-2xl font-semibold">{product.price} руб.</span>
                <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={!product.price}
                        onClick={() => addToCart(product._id, toastTopCenter)}></Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>

        {/*<h1>{title.name}</h1>*/}
        <div className="w-10 m-auto">
          <Toast ref={toastTopCenter} position="top-center"/>
          {loading ? <div className="card flex justify-content-center">
              <ProgressSpinner/>
            </div> :
            <DataView value={products.categoryProducts} itemTemplate={itemTemplate} header={header()}
                      sortField={sortField}
                      sortOrder={sortOrder}/>}
        </div>
      </div>
    )
  }
)
