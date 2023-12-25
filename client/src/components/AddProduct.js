import React, { useContext } from "react"
import { Dialog } from "primereact/dialog";
import { StateContext } from "../context/StateContext";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Dropdown } from "primereact/dropdown";
import { observer } from "mobx-react-lite";
import products from "../store/products";
import appState from "../store/appState";

export const AddProductDialog = observer(() => {

  const state = useContext(StateContext)
  const { request } = useHttp()
  const auth = useContext(AuthContext)
  const categories = Object.values(state.categories)

  const saveProduct = async () => {

    appState.setAddDialogVisible(false)
    // const body = {
    //   // _id: state._id,
    //   title: state.title,
    //   productId: state.productId,
    //   category: state.category.code,
    //   description: state.description,
    //   manufacturer: state.manufacturer,
    //   country: state.country,
    //   price: state.price,
    //   img: state.img,
    // }

    if (products.product._id) {
      try {
        await request(
          `/api/product/update/${products.product._id}`,
          'PATCH',
          products.product,
          {
            // ...body.getHeaders(),
            Authorization: `Bearer ${auth.token}`
          }
        )
      } catch (e) {
        console.log("ERROR", e)
      }
    }
    else {
      try {
        await request(
          '/api/product/generate',
          'POST',
          products.product,
          {
            Authorization: `Bearer ${auth.token}`
          }
        )
      } catch (e) {
        console.log("ERROR", e)
      }
    }
  }

  const footerContent = (
    <div>
      <Button label="Отмена" icon="pi pi-times" onClick={() => appState.setAddDialogVisible(false)}
              className="p-button-text" />
      <Button label="Сохранить" icon="pi pi-check" onClick={ saveProduct } autoFocus />
    </div>
  );

  const uploader = (event) => {
    const reader = new FileReader()
    reader.readAsDataURL(event.files[0])
    reader.onload = () => {
      products.setProductValue("img", reader.result)
      console.log("IMG ", products.product)
    }
    reader.onerror = (e) => {
      console.log("ERROR", e)
    }
    console.log("IMG", state.img)
  }

  // const uploader = async (event) => {
  //
  //   try {
  //     await request(
  //       '/api/files/upload',
  //       'POST',
  //       event.files[0],
  //       {
  //         Authorization: `Bearer ${auth.token}`
  //       }
  //     ).then(e => console.log("img", e))
  //   } catch (e) {
  //     console.log("ERROR", e)
  //   }
  // }

  return (
    <div>
      <Dialog header="Добавить новый товар" visible={appState.addDialogVisible} style={{ width: '50vw' }}
              onHide={() => appState.setAddDialogVisible(false)} footer={footerContent}>
        <div className="flex flex-column gap-2">
          <label htmlFor="title">Название</label>
          <InputText id="title" value={products.product.title}
                     onChange={(e) => products.setProductValue("title", e.target.value)} />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="productId">Идентификатор</label>
          <InputText id="productId" value={products.product.productId}
                     onChange={(e) => products.setProductValue("productId", e.target.value)} />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="category">Категория { products.product.category }</label>
          <Dropdown value={ products.categories.find(c => c.code ===products.product.category) } id="category"
                    onChange={(e) => products.setProductValue("category", e.value.code)}
                    options={ products.categories } optionLabel="name"
                    placeholder="Выберите категорию" className="w-full" />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="manufacturer">Производитель</label>
          <InputText id="manufacturer" value={products.product.manufacturer}
                     onChange={(e) => products.setProductValue("manufacturer", e.target.value)} />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="country">Страна происхождения</label>
          <InputText id="country" value={products.product.country}
                     onChange={(e) => products.setProductValue("country", e.target.value)} />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="price" >Цена</label>
          <InputText id="price" value={products.product.price}
                     onChange={(e) => products.setProductValue("price", e.target.value)} />
        </div>
        <div className="flex flex-column gap-2">
          <span className="p-float-label">
            <p className="my-2">Описание</p>
            <InputTextarea id="description" value={products.product.description}
                           onChange={(e) => products.setProductValue("description", e.target.value)} rows={3} className="w-full" />
          </span>
        </div>
        <div className="flex flex-column gap-2">
          <span className="p-float-label">
            <p className="my-2">Характеристики</p>
            <InputTextarea id="properties" value={products.product.properties}
                           onChange={(e) => products.setProductValue("properties", e.target.value)} rows={3} className="w-full" />
          </span>
        </div>
        <div className="card">
          <FileUpload name="upFile" mode="basic" accept="image/*" chooseLabel="Добавить Фото" customUpload uploadHandler={ uploader } />
        </div>
      </Dialog>
    </div>
  )
})
