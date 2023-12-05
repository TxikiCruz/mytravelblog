import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Contexts } from '../../App'

export type ParamsBreadcrumb = {
  page: string
}

const Breadcrumb = ({ page }: ParamsBreadcrumb) => {
  const { titleExperience }: any = useContext(Contexts)

  return <div className="breadcrumbs">
    <div className="container">
      <nav>
        <ul>
          <li>
            <NavLink className="breadcrumbs_link" to="/">Home</NavLink>
          </li>
          <li>
            {
              page !== 'experiences' ?
                <NavLink className="breadcrumbs_link" to="/experiences">Experiences</NavLink>
              : <span>Experiences</span>
            }
          </li>
          {
            page === 'experience' &&
            <li>
              <span>{titleExperience}</span>
            </li>
          }
        </ul>
      </nav>
    </div>
  </div>
}

export default Breadcrumb