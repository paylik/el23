import React, { useContext } from "react"
import { Dialog } from "primereact/dialog";
import { StateContext } from "../context/StateContext";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const AddProductDialog = () => {

  const state = useContext(StateContext)
  const { request } = useHttp()
  const auth = useContext(AuthContext)

  const saveProduct = async () => {

    state.setAddDialogVisible(false)
    const body = {
      productId: state.productId,
      category: state.category,
      description: state.description,
      manufacturer: state.manufacturer,
      country: state.country,
      price: state.price,
      img: state.img,
    }

    try {
      await request(
        '/api/product/generate',
        'POST',
        body,
        {
          Authorization: `Bearer ${auth.token}`
        }
      )
    } catch (e) {
    }
  }

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-times" onClick={() => state.setAddDialogVisible(false)}
              className="p-button-text" />
      <Button label="Save" icon="pi pi-check" onClick={ saveProduct } autoFocus />
    </div>
  );

  const uploader = (event) => {
    const reader = new FileReader()
    reader.readAsDataURL(event.files[0])
    reader.onload = () => {
      state.setImg(reader.result)
    }
    reader.onerror = (e) => {
      console.log("ERROR", e)
    }
    console.log("IMG", state.img)
  }

  return (
    <div>
      <Dialog header="Header" visible={state.addDialogVisible} style={{ width: '50vw' }}
              onHide={() => state.setAddDialogVisible(false)} footer={footerContent}>
        <div className="flex flex-column gap-2">
          <label htmlFor="productId">Product Id</label>
          <InputText id="productId" value={state.productId}
                     onChange={(e) => state.setProductId(e.target.value)} />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="category">Category</label>
          <InputText id="category" value={state.category}
                     onChange={(e) => state.setCategory(e.target.value)} />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="manufacturer">Manufacturer</label>
          <InputText id="manufacturer" value={state.manufacturer}
                     onChange={(e) => state.setManufacturer(e.target.value)} />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="country">Country</label>
          <InputText id="country" value={state.country}
                     onChange={(e) => state.setCountry(e.target.value)} />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="price" >Price</label>
          <InputText id="price" value={state.price}
                     onChange={(e) => state.setPrice(e.target.value)} />
        </div>
        <div className="flex flex-column gap-2">
          <span className="p-float-label">
            <p className="my-2">Description</p>
            <InputTextarea id="description" value={state.description}
                           onChange={(e) => state.setDescription(e.target.value)} rows={3} className="w-full" />
          </span>
        </div>
        <div className="card">
          <FileUpload mode="basic" accept="image/*" chooseLabel="Label" customUpload onSelect={uploader} />
        </div>
      </Dialog>
    </div>
  )
}
