import React from "react"
import not_found from "../img/not_found.jpg";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {

  const navigate = useNavigate()
  return (
    <div className="card flex flex-column align-items-center">
      <h3>Что-то пошло не так, не могу найти запрашиваемую страницу...</h3>
      <img alt="logo" src={not_found} height="400" className="mx-4"></img>
      <Button label="Перейти на главную" className="mt-3" text raised onClick={() => navigate(`/`)}/>
    </div>
  )
}
