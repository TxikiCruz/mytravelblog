import { useState } from 'react'
import { URL } from '../config'
import axios from 'axios'

const Register = () => {
  const [form, setValues] = useState({
    email: '',
    password: '',
    password2: ''
  })
  const [message, setMessage] = useState('')
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
      setMessage(response.data.message)
      console.log(response)
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
              <input name="email" className="form_control" placeholder="Write your email" />
              <input name="password" className="form_control" placeholder="Write your password" />
              <input name="password2" className="form_control" placeholder="Confirm your password" />
              <button className="btn">register</button>

              <div className='message'><p className="msg">{message}</p></div>
            </form>
        </div>
  
}

export default Register