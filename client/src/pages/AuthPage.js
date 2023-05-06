import React, { useContext, useEffect, useRef, useState } from "react"
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useHttp } from "../hooks/http.hook";
import { Toast } from "primereact/toast";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const toast = useRef(null)
  const message = useMessage(toast)
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      auth.login(data.token, data.userId, data.isAdmin)
      message(data.message)
    } catch (e)  {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId, data.isAdmin)
    } catch (e)  {}
  }

  return (
    <div className="flex flex-column md:flex-row">
      <Toast ref={toast} className="absolute" />
      <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
          <label htmlFor="email" className="w-6rem">
            Email
          </label>
          <InputText id="email" type="text" placeholder="Email" name="email" onChange={changeHandler} />
        </div>
        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
          <label htmlFor="password" className="w-6rem">
            Password
          </label>
          <InputText id="password" type="password" placeholder="Password" name="password" onChange={changeHandler} />
        </div>
        <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto" disabled={loading} onClick={loginHandler} />
      </div>
      <div className="w-full md:w-2">
        <Divider layout="vertical" className="hidden md:flex">
          <b>OR</b>
        </Divider>
        <Divider layout="horizontal" className="flex md:hidden" align="center">
          <b>OR</b>
        </Divider>
      </div>
      <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
        <Button label="Sign Up" icon="pi pi-user-plus" className="p-button-success" onClick={registerHandler} disabled={loading} />
      </div>
    </div>
    )
}
