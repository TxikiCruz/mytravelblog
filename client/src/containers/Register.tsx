import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../config'
import Msgbox from '../components/common/Msgbox'

const Register = ({ login, logout }) => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
    password: '',
    password2: ''
  })

  const [message, setMessage] = useState({body: '', classname: ''})
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const loginRegister = async () => {
    try {
      const response = await axios.post(`${URL}/users/login`, {
        email: values.email,
        password: values.password
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    logout()
    try {
      const response = await axios.post(`${URL}/users/register`, {
        email: values.email,
        password: values.password,
        password2: values.password2
      })
      console.log(response)
      loginRegister()
      setMessage({ body: response.data.message, classname: 'msg_ok' })
    }
    catch (error) {
      console.log(error)
    }

  }
  return <div className="page login">
    <h2 className="title">Register</h2>

    <form
      onSubmit={handleSubmit}
      onChange={handleChange}
      className='form'
    >
      <input type="text" name="email" className="form_control" placeholder="Write your email" />
      <input type="password" name="password" className="form_control" placeholder="Write your password" />
      <input type="password" name="password2" className="form_control" placeholder="Confirm your password" />
      <button className="btn">Register</button>
    </form>

    <Msgbox body={message.body} classname={message.classname} />
  </div>

}

export default Register