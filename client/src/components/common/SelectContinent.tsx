import { useState, useEffect } from 'react'
import { sortBy } from 'lodash'
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatchSelector'
import { Cat, fetchCats, catsSelector } from '../../store/slice-categories'

export type PropsSelectCategories = {
  handleChange: any
  selected?: string
}

const SelectContinent = () => {
  const [continents, setContinents] = useState(['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'])

  return <select name="continent" className="form_control">
      <option>Continent</option>
      {
        continents.map((ele) => {
          return <option key={ele} value={ele}>
            {ele}
          </option>
        })
      }
    </select>
}

export default SelectContinent