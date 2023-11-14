import { useNavigate } from 'react-router-dom'
import africa from '../../assets/images/africa-bg.png'
import northamerica from '../../assets/images/northamerica-bg.png'
import southamerica from '../../assets/images/southamerica-bg.png'
import asia from '../../assets/images/asia-bg.png'
import europe from '../../assets/images/europe-bg.png'
import australia from '../../assets/images/australia-bg.png'

const SearchByContinent = () => {
  const navigate = useNavigate()

  const onClickContinent = (str: string) => {
    navigate(`/search-by-continent/${str}`)
  }

  return <div className="continents">
      <ul>
        <li>
          <img src={africa} alt="Africa" />
          <a className="link" onClick={() => onClickContinent('africa')}>Africa</a>
        </li>
        <li>
          <img src={northamerica} alt="North America" className="na" />
          <img src={southamerica} alt="South America" className="sa" />
          <a className="link" onClick={() => onClickContinent('americas')}>America</a>
        </li>
        <li>
          <img src={asia} alt="Asia" />
          <a className="link" onClick={() => onClickContinent('asia')}>Asia</a>
        </li>
        <li>
          <img src={europe} alt="Europe" />
          <a className="link" onClick={() => onClickContinent('europe')}>Europe</a>
        </li>
        <li>
          <img src={australia} alt="Australia" />
          <a className="link" onClick={() => onClickContinent('oceania')}>Oceania</a>
        </li>
      </ul>
    </div>
}

export default SearchByContinent