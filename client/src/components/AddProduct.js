import React, { useCallback, useContext, useRef, useState } from "react"
import { Dialog } from "primereact/dialog";
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
import { Toast } from "primereact/toast";

export const AddProductDialog = observer(() => {

  // const state = useContext(StateContext)
  const {request} = useHttp()
  const auth = useContext(AuthContext)
  const toastTopCenter = useRef(null)
  const [imageFile, setImageFile] = useState(null)
  const [imgSRC, setImgSRC] = useState("")
  // const [canvasHeight, setCanvasHeight] = useState(112)
  // const categories = Object.values(state.categories)

  const saveImage = useCallback(async () => {
    try {
      await request(
        `/api/img/addImg/${products.product.productId}`,
        `POST`,
        // {img: products.product.img, id: products.product.productId},
        {img: imageFile, id: products.product.productId},
        {
          Authorization: `Bearer ${auth.token}`
        }
      )
    } catch (e) {
      toastTopCenter.current.show({
        severity: 'error', summary: 'Ошибка загрузки фото',
        detail: e.message, life: 3000
      })
      console.log(e.message)
    }
  }, [auth.token, imageFile, request])

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
        toastTopCenter.current.show({
          severity: 'error', summary: 'Ошибка загрузки',
          detail: e.message, life: 3000
        })
        console.log(e)
      }
      await saveImage()
    } else {
      try {
        await request(
          '/api/product/generate',
          'POST',
          products.product,
          {
            Authorization: `Bearer ${auth.token}`
          }
        )
        await saveImage()
      } catch (e) {
        console.log("ERROR", e)
      }
    }
  }

  const footerContent = (
    <div>
      <Button label="Отмена" icon="pi pi-times" onClick={() => appState.setAddDialogVisible(false)}
              className="p-button-text"/>
      <Button label="Сохранить" icon="pi pi-check" onClick={saveProduct} autoFocus/>
    </div>
  );

  const uploader = (event) => {
    const reader = new FileReader()
    reader.readAsDataURL(event.files[0])
    reader.onload = () => {
      // products.setProductValue("img", reader.result)
      setImageFile(reader.result)
      setImgSRC(reader.result)
      // const canvas = document.querySelector("canvas")
      // const ctx = canvas.getContext("2d")
      const image = document.getElementById("img")
      const makePreview = () => {
        const canv = document.createElement("canvas")
        const previewHeight = 112 * image.height / image.width
        canv.height = previewHeight
        canv.width = 112
        const ctx = canv.getContext("2d")
        ctx.drawImage(image, 0, 0, 112, previewHeight)
        const file = canv.toDataURL("image/jpeg", 1.0)
        products.setProductValue("img", file)
      }
      image.addEventListener("load", makePreview)
      // image.removeEventListener("load", makePreview)

    }
    reader.onerror = (e) => {
      console.log("ERROR", e)
    }
    // console.log("IMG", state.img)
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

  // const onUpload = () => {
  //   console.log("RRRRRRRRRR")
  // }

  return (
    <div>
      <Toast ref={toastTopCenter} position="top-center"/>
      <Dialog header="Добавить новый товар" visible={appState.addDialogVisible} style={{width: '50vw'}}
              onHide={() => appState.setAddDialogVisible(false)} footer={footerContent}>
        <div className="flex flex-column gap-2">
          <label htmlFor="title">Название</label>
          <InputText id="title" value={products.product.title}
                     onChange={(e) => products.setProductValue("title", e.target.value)}/>
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="productId">Идентификатор</label>
          <InputText id="productId" value={products.product.productId}
                     onChange={(e) => products.setProductValue("productId", e.target.value)}/>
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="category">Категория {products.product.category}</label>
          <Dropdown value={products.categories.find(c => c.code === products.product.category)} id="category"
                    onChange={(e) => products.setProductValue("category", e.value.code)}
                    options={products.categories} optionLabel="name"
                    placeholder="Выберите категорию" className="w-full"/>
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="manufacturer">Производитель</label>
          <InputText id="manufacturer" value={products.product.manufacturer}
                     onChange={(e) => products.setProductValue("manufacturer", e.target.value)}/>
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="country">Страна происхождения</label>
          <InputText id="country" value={products.product.country}
                     onChange={(e) => products.setProductValue("country", e.target.value)}/>
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="price">Цена</label>
          <InputText id="price" value={products.product.price}
                     onChange={(e) => products.setProductValue("price", e.target.value)}/>
        </div>
        <div className="flex flex-column gap-2">
          <span className="p-float-label">
            <p className="my-2">Описание</p>
            <InputTextarea id="description" value={products.product.description}
                           onChange={(e) => products.setProductValue("description", e.target.value)} rows={3}
                           className="w-full"/>
          </span>
        </div>
        <div className="flex flex-column gap-2">
          <span className="p-float-label">
            <p className="my-2">Характеристики</p>
            <InputTextarea id="properties" value={products.product.properties}
                           onChange={(e) => products.setProductValue("properties", e.target.value)} rows={3}
                           className="w-full"/>
          </span>
        </div>
        <div className="card">
          <FileUpload name="upFile" mode="basic" accept="image/*" maxFileSize={400000} chooseLabel="Добавить Фото"
                      customUpload onSelect={uploader} url="/img/products"/>
        </div>
        {/*<canvas width="112" height={canvasHeight}>*/}
        {/*  An alternative text describing what your canvas displays.*/}
        {/*</canvas>*/}
        <img style={{display: 'none'}} src={imgSRC} id="img" alt="img"/>
      </Dialog>
    </div>
  )
})
