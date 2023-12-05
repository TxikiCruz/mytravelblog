//import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Contexts } from '../App'
import NavAdmin from '../containers/NavAdmin'

type ParamsAdminLayout = {
  children: JSX.Element
}

const AdminLayout = ({ children }: ParamsAdminLayout) => {
  const { token, isLoggedInValue } = useContext(Contexts)

  return <div className="page admin">
      <div className="container">
        <div className="top">
          <h2 className="title">Admin Panel</h2>
          {isLoggedInValue.isLoggedIn}
          <NavAdmin />
        </div>

        {!token && !isLoggedInValue?.isLoggedIn ? <Navigate to="/login" replace /> : children}
      </div>
    </div>
}

export default AdminLayout