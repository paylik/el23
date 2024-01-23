import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { InputNumber } from "primereact/inputnumber"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Toast } from "primereact/toast"
import { InputText } from "primereact/inputtext"
import emailjs from '@emailjs/browser'
import { Link } from "react-router-dom";
import products from "../store/products";
import { ProgressSpinner } from "primereact/progressspinner";


export const CartPage = observer(() => {

  const auth = useContext(AuthContext)
  const [cartProducts, setCartProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [deleteProductDialog, setDeleteProductDialog] = useState(false)
  const [product, setProduct] = useState(null)
  const {request, loading} = useHttp()
  const toast = useRef(null)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [note, setNote] = useState("")

  const fetchData = useCallback(async () => {
    const cart = []
    await Promise.all(auth.cart.map(async (product) => {
      const data = await request(`/api/product/${product.product}`, 'GET', null)
      cart.push({product: data, quantity: product.quantity})
    }))
    const tableCart = cart.map(product => {
      return {
        id: product.product._id,
        image: product.product.img,
        title: product.product.title,
        category: product.product.category,
        quantity: product.quantity,
        price: product.product.price,
        // sum: (product.product.price * product.quantity).toFixed(2)
      }
    })
    setCartProducts(tableCart)
  }, [auth.cart, request])

  const calculateSum = useCallback(() => cartProducts.reduce((sum, currentValue) => {
    sum += (currentValue.price * currentValue.quantity)
    return sum
  }, 0), [cartProducts])

  useEffect(() => {
    fetchData()
  }, [auth.cart, fetchData])
  useEffect(() => {
    setTotal(calculateSum().toFixed(2))
  }, [cartProducts, calculateSum])

  const deleteProduct = () => {
    let _products = cartProducts.filter((val) => val.id !== product.id)

    setCartProducts(_products)
    setDeleteProductDialog(false)
    auth.removeFromCart(product)
    setProduct(null)
    toast.current.show({severity: 'success', summary: 'Successful', detail: 'Товар удален из корзины', life: 3000})
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Корзина</span>
      {/*<Button icon="pi pi-refresh" rounded raised />*/}
    </div>
  )

  const footer = `Итого в корзине ${cartProducts ? cartProducts.length : 0} 
  товаров на сумму ${total ?? 0} рублей`

  const imageBodyTemplate = (product) => {
    return <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name}
                                                    className="w-4rem shadow-2 border-round"/>
    </ Link>
  }

  const quantityEditor = (options) => {
    const copy = cartProducts.map(p => {
      if (p.id === options.rowData.id) {
        p.quantity = options.value
        return p
      } else return p
    })

    return <InputNumber value={options.value}
                        onValueChange={(e) => {
                          options.editorCallback(e.value);
                          setCartProducts(copy)
                        }}/>;
  }

  const isPositiveInteger = (val) => {
    let str = String(val);

    str = str.trim();

    if (!str) {
      return false;
    }

    str = str.replace(/^0+/, '') || '0'
    let n = Math.floor(Number(str));

    return n !== Infinity && String(n) === str && n >= 0
  };

  const onCellEditComplete = (e) => {
    let {rowData, newValue, originalEvent: event} = e
    if (isPositiveInteger(newValue)) {
      auth.addToCart(e.rowData.id, e.value)
      rowData.quantity = newValue
    } else event.preventDefault()
  }

  const sendEmail = (e) => {
    e.preventDefault()

    const str = `
      Имя: ${name}
      Телефон: ${phone}
      Адрес: ${address}
      Примечание: ${note}
      Товары:
      ${cartProducts.map(p => {
      return `
        ${p.title} , кол-во - ${p.quantity} шт, цена - ${p.price}, итого - ${(p.price * p.quantity).toFixed(2)} `
    })}
    Итого ${total} руб
    `

    const params = {
      name: name,
      message: str,
      phone: phone
    }

    emailjs.send('service_q6dbwsg', 'template_v0b05f9', params, '0O8ydkTAlQvyNmqKJ')
      .then((result) => {
        console.log(result.text)
        setCartProducts([])
        auth.removeFromCart()
        toast.current.show({
          severity: 'success',
          summary: 'Отправлено',
          detail: 'Ваш заказ отправлен на обработку. Нашего менеджер перезвонит вам в ближайшее время.',
          life: 3000
        })
      }, (error) => {
        console.log(error.text)
        toast.current.show({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Ошибка отправки заказа.',
          life: 3000
        })
      })
  }

  const sumTemplate = (product) => {
    return (product.quantity * product.price).toFixed(2)
  }

  const categoryTemplate = (product) => {
    return products.getCategoryName(product.category)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)}/>
    )
  }

  const confirmDeleteProduct = (product) => {
    setProduct(product)
    setDeleteProductDialog(true)
  }

  const deleteProductDialogFooter = (
    <>
      <Button label="Отмена" icon="pi pi-times" outlined onClick={() => setDeleteProductDialog(false)}/>
      <Button label="Удалить" icon="pi pi-check" severity="danger" onClick={deleteProduct}/>
    </>
  );

  const cart = (
    <div className="card p-fluid">
      <DataTable value={cartProducts} sortField="title" sortOrder={1} size={"small"}
                 stripedRows editMode="cell" header={header} footer={footer} tableStyle={{minWidth: '60rem'}}>
        <Column header="Фото" body={imageBodyTemplate}></Column>
        <Column field="title" header="Название" sortable></Column>
        <Column field="category" header="Категория" body={categoryTemplate}></Column>
        <Column field="quantity" header="Количество" editor={(options) => quantityEditor(options)}
                onCellEditComplete={onCellEditComplete}></Column>
        {/*<Column field="price" header="Цена" body={priceBodyTemplate}></Column>*/}
        <Column field="price" header="Цена"></Column>
        <Column field="sum" header="Стоимость" body={sumTemplate}></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '2rem'}}></Column>
      </DataTable>
      <div className="card justify-content-center">
        <div className="p-float-label mt-5">
          <InputText id="name" value={name} onChange={(e) => setName(e.target.value)}
                     className={!name ? "p-invalid" : ""}/>
          <label htmlFor="name">ФИО</label>
        </div>
        <div className="p-float-label mt-5">
          <InputText id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                     className={!phone ? "p-invalid" : ""}/>
          <label htmlFor="phone">Телефон</label>
        </div>
        <div className="p-float-label mt-5">
          <InputText id="address" value={address} onChange={(e) => setAddress(e.target.value)}
                     className={!address ? "p-invalid" : ""}/>
          <label htmlFor="address">Адрес</label>
        </div>
        <div className="p-float-label mt-5">
          <InputText id="note" value={note} onChange={(e) => setNote(e.target.value)}
                     className={!note ? "p-invalid" : ""}/>
          <label htmlFor="note">Примечание</label>
        </div>
      </div>
      <Button label="Оформить заказ" icon="pi pi-check" className="mt-5" disabled={!phone} onClick={sendEmail}/>
    </div>
  )

  return (
    <div className="mx-6">
      <h1>Корзина</h1>
      {loading ? <div className="card flex justify-content-center">
        <ProgressSpinner/>
      </div> : cart}
      <Toast ref={toast}/>
      <Dialog visible={deleteProductDialog} style={{width: '32rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}}
              header="Внимание" modal footer={deleteProductDialogFooter} onHide={() => setDeleteProductDialog(false)}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
          {product && (
            <span> Вы уверены, что необходимо удалить <b>{product.title}</b>? </span>
          )}
        </div>


      </Dialog>
    </div>
  )
})
