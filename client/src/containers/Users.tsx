import { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { Contexts } from '../App'
import { MdDelete, MdEdit, MdClose, MdCheckCircle } from 'react-icons/md'
import { URL } from '../config'
import Msgbox from '../components/common/Msgbox'

const Users = () => {
  const [users, setUsers] = useState([])
  const [newValues, setNewValues] = useState({ role: '' })
  const [message, setMessage] = useState({ body: '', classname: '' })
  const [updateActive, setUpdateActive] = useState(null)

  const { setRole } = useContext(Contexts)
  //console.log(roleValue)

  const typesUser = [
    { type: 'admin' },
    { type: 'author' }
  ]

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    let tempUsers = []
    let url = `${URL}/users`
    try {
      const res = await axios.get(url)
      let data = res.data
      for (let ele of data) {
        tempUsers.push({ _id: ele._id, email: ele.email, password: ele.password, role: ele.role })
      }
      setUsers(tempUsers)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeNew = e => {
    setNewValues({ ...newValues, [e.target.name]: e.target.value })
  }

  const onClickDelete = async (id) => {
    try {
      let url = `${URL}/users/delete`
      await axios.post(url, { _id: id })
      getUsers()
      setMessage({ body: `User deleted!`, classname: 'msg_ok' })
    } catch (error) {
      console.log(error)
    }
  }

  const onClickShowUpdate = async (e, id) => {
    e.preventDefault()
    setUpdateActive(id)
    let idx = users.findIndex(e => e._id === id)
    setNewValues({ role: users[idx].role })
  }

  const onClickClose = async (e) => {
    e.preventDefault()
    setUpdateActive(null)
  }

  const onClickUpdate = async (id) => {
    try {
      let url = `${URL}/users/update`
      if (newValues.role !== '') {
        await axios.post(url, { _id: id, role: newValues.role })
        setUpdateActive(null)
        setRole(newValues.role)
        getUsers()
        setMessage({ body: `User updated!`, classname: 'msg_ok' })
      } else {
        setMessage({ body: 'Write a role', classname: 'msg_error' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <div className="content users">
    <div className="content_top">
      <h2 className="content_top_title">Users</h2>
      <p className="content_top_subtitle">*To create a new user go to <NavLink to={"/register"}>Register</NavLink> page</p>
    </div>

    <div className="table">
      <div className="tGroup tHead">
        <div className="tRow">
          <div className="tCol w40"><span><strong>Email</strong></span></div>
          <div className="tCol w30 scroll"><span><strong>Password</strong></span></div>
          <div className="tCol w20 center"><span><strong>Role</strong></span></div>
          <div className="tCol w10 right"><span><strong>Action</strong></span></div>
        </div>
      </div>
      {
        users.map((ele, i) => {
          return <div className="tGroup" key={ele._id}>
            <div className="tRow">
              <div className="tCol">
                <span>{ele.email}</span>
              </div>
              <div className="tCol scroll">
                <span>{ele.password}</span>
              </div>
              <div className="tCol center">
                {updateActive !== ele._id ?
                  <span>{ele.role}</span>
                  :
                  <select 
                    name="role"
                    className="form_control" 
                    defaultValue={ele.role} 
                    onChange={handleChangeNew}
                  >
                    {typesUser.map(ele => {
                      return <option key={ele.type} value={ele.type}>{ele.type}</option>
                    })}
                  </select>
                }
              </div>
              <div className="tCol">
                <div className="icons">
                  {!updateActive ?
                    <>
                      <button className="btn_action" onClick={(e) => onClickShowUpdate(e, ele._id)}>
                        <MdEdit />
                      </button>
                      <button className="btn_action" onClick={() => onClickDelete(ele._id)}>
                        <MdDelete />
                      </button>
                    </>
                    : 
                    <>
                      <button className="btn_action green" onClick={() => onClickUpdate(ele._id)}>
                        <MdCheckCircle />
                      </button>
                      <button className="btn_action" onClick={onClickClose}>
                        <MdClose />
                      </button>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        })
      }
    </div>

    <Msgbox message={message.body} classname={message.classname} />
  </div>
}

export default Users
