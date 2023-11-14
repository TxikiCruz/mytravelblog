import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Contexts } from '../App'

const NavbarAdmin = () => {
  const { role } = useContext(Contexts)

  return <nav className='admin_nav'>
    <ul>
      <li><NavLink to={"/admin/experiences"}>Experiences</NavLink></li>
      <li><NavLink to={"/admin/categories"}>Categories</NavLink></li>
      <li><NavLink to={"/admin/comments"}>Comments</NavLink></li>
      <li><NavLink to={"/admin/scores"}>Scores</NavLink></li>
      <li><NavLink to={"/admin/images"}>Images</NavLink></li>
      { role === 'admin' && <li><NavLink to={"/admin/users"}>Users</NavLink></li> }
    </ul>
  </nav>
}

export default NavbarAdmin
