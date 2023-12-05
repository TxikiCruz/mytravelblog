import { useState, useEffect } from 'react'
import { sortBy } from 'lodash'
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatchSelector'
import { Cat, fetchCats, catsSelector } from '../../store/slice-categories'
//import { useSelector, useDispatch } from 'react-redux'
//import { getCats, getCatsStatus, getCatsError, fetchCats } from '../../store/slice-categories'

export type PropsSelectCategories = {
  handleChange: any
  selected?: string
}

const SelectCategories = ({ handleChange, selected }: PropsSelectCategories) => {
  // fetch Categories
  const [cats, setCats] = useState<Array<Cat>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const selectedCats = useAppSelector(catsSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setLoading(selectedCats.loading)
    setError(selectedCats.error)
    const sortedCats = sortBy(selectedCats.cats, [cat => cat.name.toLowerCase()])
    setCats(sortedCats)
  }, [selectedCats])

  function handleFetchCats() {
    dispatch(fetchCats())
  }

  useEffect(() => {
    handleFetchCats()
  }, [])

  return <select name="category" className="form_control" onChange={handleChange} defaultValue={selected}>
    <option>{selected || "Category"}</option>
    {
      !loading && cats?.length > 0 && cats.map((ele: Cat) => {
        return <option key={ele._id} value={ele.name}>
          {ele.name}
        </option>
      })
    }
    {error}
  </select>
}

export default SelectCategories