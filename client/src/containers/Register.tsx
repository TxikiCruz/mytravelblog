import { useState } from 'react'
import axios from 'axios'
import { URL } from '../config'
import Msgbox from '../components/common/Msgbox'

const Register = () => {
  const [form, setValues] = useState({
    email: '',
    password: '',
    password2: ''
  })

  const [message, setMessage] = useState({body: '', classname: ''})
  const handleChange = e => {
    setValues({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${URL}/users/register`, {
        email: form.email,
        password: form.password,
        password2: form.password2
      })
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
      <button className="btn">register</button>
    </form>

    <Msgbox body={message.body} classname={message.classname} />
  </div>

}

export default Register