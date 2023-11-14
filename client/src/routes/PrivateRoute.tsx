import { Navigate } from 'react-router-dom'

export type ParamsPrivateRoute = {
  isLoggedIn: boolean
  children: JSX.Element
}

const PrivateRoute = ({ isLoggedIn, children }: ParamsPrivateRoute) => {
  return !isLoggedIn ? <Navigate to="/login" replace /> : children
}

export default PrivateRoute