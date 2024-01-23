import React from "react"
import delivery from "../img/delivery.jpg"

export const DeliveryPage = () => {

  return (
    <div className="card flex flex-column align-items-center">
      <h1>Доставка</h1>
      <h3>Доставка осуществляется при 100% предоплате за товар.</h3>
      <img alt="logo" src={delivery} height="400" className="mx-4"></img>
    </div>
  )
}
