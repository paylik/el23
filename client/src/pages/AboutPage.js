import React from "react"
import working from "../img/working.avif"

export const AboutPage = () => {
  return (
    <div className="card flex flex-column align-items-center">
      <h1>О нас</h1>
      <h3>Интернет-магазин еще в стадии открытия, но если вас интересует разработка сайта, то отбащайтесь к этому
        парню:</h3>
      <img alt="logo" src={working} height="400" className="mx-4"></img>
      <a href="https://t.me/ppppp99099" target="_blank" rel="noopener noreferrer" className="p-button font-bold mt-3">
        Написать разработчику
      </a>
    </div>
  )
}
