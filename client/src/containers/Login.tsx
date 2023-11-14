import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../config'
import Msgbox from '../components/common/Msgbox'

const Login = ({ login }) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  const [form, setValues] = useState({
    email: '',
    password: ''
  })

  const handleChange = e => {
    setValues({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${URL}/users/login`, {
        email: form.email,
        password: form.password
      })
      setMessage({ body: response.data.message, classname: 'msg_ok' })
      if (response.data.ok) {
        setTimeout(() => {
          login(response.data.token, response.data.role)
          navigate('/admin/')
        }, 2000)
      }

    }
    catch (error) {
      console.log(error)
    }
  }

  return <div className="page login">
    <h2 className="title">Login</h2>

    <form
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="form"
    >
      <input name="email" className="form_control" placeholder="Write your email" />
      <input name="password" className="form_control" placeholder="Write your password" />
      <button className="btn">login</button>
    </form>

    <Msgbox message={message.body} classname={message.classname} />
  </div>
}

export default Login
