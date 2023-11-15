import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'

const Header = ({
  isLoggedIn,
  logout
}) => {
  return <header className="header">
      <div className="container">
        <div className="flex">
          <div className="header_left">
            <NavLink to={"/"} className="header_logo">
              <h1 className="header_title">MyTravelBlog</h1>
            </NavLink>
          </div>

          <div className="header_right">
            <Navbar isLoggedIn={isLoggedIn} logout={logout} />
          </div>
        </div>
      </div>
    </header>
}

export default Header