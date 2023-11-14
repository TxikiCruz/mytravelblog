import { useState, useEffect, createContext, useMemo } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import axios from 'axios'
import { URL } from './config'
import AdminLayout from './layouts/AdminLayout'
import Header from './components/common/Header'
import Breadcrumb from './components/common/Breadcrumb'
import Footer from './components/common/Footer'
import Home from './components/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import SearchPage from './components/search/SearchPage'
import SearchPageContinent from './components/search/SearchPageContinent'
import Experience from './components/Experience'
import AllExperiences from './components/AllExperiences'
import Contact from './components/Contact'
import Experiences from './containers/experiences/Experiences'
import Categories from './containers/Categories'
import Comments from './containers/Comments'
import Scores from './containers/Scores'
import Users from './containers/Users'
import Images from './containers/Images'
import ScrollToTop from './components/common/ScrollToTop'
import './assets/sass/main.scss'

export const Contexts = createContext({})

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('')
  // Experience title for context
  const [titleExperience, setTitleExperience] = useState('')

  // We use useMemo here to keep the value every render
  const isLoggedInValue = useMemo(
    () => ({ isLoggedIn, setIsLoggedIn }), 
    [isLoggedIn]
  )

  const [user, setUser] = useState('')
  const token = JSON.parse(localStorage.getItem('token'))

  const verify_token = async () => {
    if (token === null) {
      return setIsLoggedIn(false)
    }
    try {
      axios.defaults.headers.common['Authorization'] = token
      const response = await axios.post(`${URL}/users/verify_token`)
      setRole(response.data.succ.role)
      setUser(response.data.succ.email)
      return response.data.ok ? setIsLoggedIn(true) : setIsLoggedIn(false)
    }
    catch (error) {
      console.log(error)
    }
  }

  const login = (token, role) => {
    //console.log('token ===>')
    setRole(role)
    localStorage.setItem('token', JSON.stringify(token))
    setIsLoggedIn(true)
  }
  
  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  useEffect(() => {
    verify_token()
  }, [])

  // breadcrumbs
  const pagesWithBreadcrumbs = [
    { page: 'experiences' },
    { page: 'experience' }
  ]

  const location = useLocation()
  const [page, setPage] = useState('')
  const [showBreadcrumb, setShowBreadcrumb] = useState(false)

  useEffect(() => {
    const pathname = location.pathname.split('/')[1]
    setPage(pathname)

    if (pagesWithBreadcrumbs.some((item) => item.page === page)) {
      setShowBreadcrumb(true)
    } else {
      setShowBreadcrumb(false)
    }
  }, [location, page])

  // type GlobalContent = {
  //   isLoggedInValue: boolean
  //   titleExperience: string
  //   setTitleExperience: (c: string) => void
  // }

  const contextValues = {
    isLoggedInValue, 
    role,
    setRole,
    titleExperience, 
    setTitleExperience
  }

  return (
    <Contexts.Provider value={contextValues}>
      <ScrollToTop />
      <Header isLoggedIn={isLoggedIn} logout={logout} />

      { showBreadcrumb &&
      <Breadcrumb page={page} />
      }

      <main>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/experiences" element={<AllExperiences />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/login' element={<Login login={login} />} />
          <Route path='/register' element={<Register />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-by-continent/:search" element={<SearchPageContinent />} />
          <Route path="/experience/:exp" element={<Experience user={user} />} />

          <Route path='/admin' element={
            <AdminLayout>
              <Experiences user={user} />
            </AdminLayout>
          } />
          <Route path='/admin/experiences' element={
            <AdminLayout>
              <Experiences user={user} />
            </AdminLayout>
          } />
          <Route path='/admin/categories' element={
            <AdminLayout>
              <Categories />
            </AdminLayout>
          } />
          <Route path='/admin/comments' element={
            <AdminLayout>
              <Comments />
            </AdminLayout>
          } />
          <Route path='/admin/scores' element={
            <AdminLayout>
              <Scores />
            </AdminLayout>
          } />
          <Route path='/admin/users' element={
            <AdminLayout>
              <Users />
            </AdminLayout>
          } />
          <Route path='/admin/images' element={
            <AdminLayout>
              <Images />
            </AdminLayout>
          } />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </main>

      <Footer />
    </Contexts.Provider>
  )
}

export default App
