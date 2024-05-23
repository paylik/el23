import React from 'react';
import { Button } from "primereact/button";

export const Footer = () => {
  return (
    <footer>
      {/*<Panel>*/}
      <div className="bg-purple-50 my-2 flex justify-content-center flex-wrap">
        <Button icon="pi pi-instagram" size="large" rounded text severity="info"
                aria-label="Instagram" onClick={() => window.open('https://www.instagram.com/', '_blank')}/>
        <Button icon="pi pi-telegram" size="large" rounded text severity="info" aria-label="Telegram"
                onClick={() => window.open('https://telegram.org/', '_blank')}/>
        <Button icon="pi pi-youtube" size="large" rounded text severity="info" aria-label="Youtube"
                onClick={() => window.open('https://www.youtube.com/', '_blank')}/>
        <Button icon="pi pi-inbox" label="paylik@yandex.ru" rounded text size="large"
                onClick={() => window.location = 'mailto:paylik@yandex.ru'}/>
      </div>
      {/*</Panel>*/}
    </footer>
  )
}
