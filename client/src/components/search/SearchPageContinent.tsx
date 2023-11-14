import { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getExps, getExpsStatus, getExpsError, fetchExps } from '../../store/slice-experiences'
import { useLocation } from 'react-router-dom'
import Card from '../common/Card'

const SearchPageContinent = () => {
  const dispatch = useDispatch()
  const exps = useSelector(getExps)
  const expsStatus = useSelector(getExpsStatus)
  // const expsError = useSelector(getExpsError)

  const location = useLocation()
  const [searchResults, setSearchResults] = useState([])
  const [param, setParam] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [countries, setCountries] = useState([])

  const getPathSearch = () => {
    let currentPath = location.pathname
    let newParam = currentPath.split('/')[2].toLowerCase()
    setParam(newParam)
    getCountries(newParam)
  }

  const getCountries = async (str) =>{
    try {  
      let data = await fetch(`https://restcountries.com/v3.1/region/${str}`)
      let dataJSON = await data.json()
      let tempCont = []
      for (let ele of dataJSON){
        tempCont.push(ele.name.common)
      }
      setCountries(tempCont)
      loadResults()
    } catch (error) {
      console.log(error)
    }
  }

  const loadResults = () => {
    if (countries.length > 0) {
      let expsResult = exps.filter(item => countries.includes(item.category))
      setSearchResults(expsResult)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (expsStatus === 'idle') {
      dispatch(fetchExps())
    }

    if (expsStatus === 'succeeded' && param) {
      loadResults()
    }
  }, [countries, expsStatus, dispatch])

  useEffect(() => {
    getPathSearch()
  }, [])

  return <>
    <div className="page search">
      <div className="container">
        <div className="search_content">

          { !isLoading && searchResults.length > 0 &&
            <>
              <h2 className="search_title">Results search for <span>{param}</span></h2>

              <div className="modResultExps">
                {
                  searchResults.map((ele, i) => {

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
            }

            {
              !isLoading && searchResults.length === 0 &&
              <p className="msg error">No Results for {param}</p>
            }
        </div>
      </div>
    </div>
  </>
}


export default SearchPageContinent