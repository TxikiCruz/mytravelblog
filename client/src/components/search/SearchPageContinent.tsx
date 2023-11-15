import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatchSelector'
import { Experience, fetchExperiences, experiencesSelector } from '../../store/slice-experiences-new'
import { Cat, fetchCats, catsSelector } from '../../store/slice-categories'
import { useLocation } from 'react-router-dom'
import Card from '../common/Card'
import Spinner from '../common/Spinner'

const SearchPageContinent = () => {
  const location = useLocation()
  const [param, setParam] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  // fetch Experiences
  const [experiences, setExperiences] = useState<Array<Experience>>([])
  const [expsFiltered, setExpsFiltered] = useState<Array<Experience>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const selectedExperiences = useAppSelector(experiencesSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setLoading(selectedExperiences.loading)
    setError(selectedExperiences.error)
    setExperiences(selectedExperiences.experiences)
  }, [selectedExperiences])

  function handleFetchExperiences() {
    dispatch(fetchExperiences())
  }

  useEffect(() => {
    handleFetchExperiences()
  }, [])

  // fetch Categories
  const [cats, setCats] = useState<Array<Cat>>([])
  const [loadingCats, setLoadingCats] = useState<boolean>(false)
  //const [error, setError] = useState<string | undefined>(undefined)
  const selectedCats = useAppSelector(catsSelector)
  //const dispatch = useAppDispatch()

  useEffect(() => {
    setLoadingCats(selectedCats.loading)
    //setError(selectedCats.error)
    setCats(selectedCats.cats)
  }, [selectedCats])

  function handleFetchCats() {
    dispatch(fetchCats())
  }

  useEffect(() => {
    handleFetchCats()
  }, [])

  // Get param continent
  const getPathSearch = () => {
    let currentPath = location.pathname
    let newParam = currentPath.split('/')[2].toLowerCase()
    setParam(newParam)
  }

  useEffect(() => {
    getPathSearch()
  }, [location.pathname])

  // Filter experiences that match with Countries result
  useEffect(() => {
    const catsFiltered = cats.filter(item => item.continent?.toLowerCase() === param)

    let temp = []
    Object.values(catsFiltered).forEach((elem) => {
      experiences.forEach((item) => {
        if (item.category?.toLowerCase() === elem.name.toLowerCase()) {
          temp.push(item)
        }
      })
    })
    setExpsFiltered(temp)
  }, [param])


  return <div className="page search">
    <div className="container">
      <div className="wrapper">

        {!isLoading && !loading && expsFiltered ?
          <>
            <div className="top">
              <h2 className="title">Results search for <span>{param}</span></h2>
            </div>

            <div className="content">
              {
                expsFiltered.map((ele) => {

                  return <Fragment key={`continentExp-${ele._id}`}>
                    <Card
                      _id={ele._id}
                      title={ele.title}
                      category={ele.category}
                      content={ele.content}
                      date={ele.date}
                      score={ele.score}
                      image={ele.image}
                    />
                  </Fragment>
                })
              }
            </div>
          </>
          : <Spinner />
        }

        {
          !isLoading && !loading && expsFiltered.length === 0 &&
          <p className="msg error">No Results</p>
        }
      </div>
    </div>
  </div>
}

export default SearchPageContinent