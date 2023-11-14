import { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getExps, getExpsStatus, getExpsError, fetchExps } from '../../store/slice-experiences'
import { useLocation } from 'react-router-dom'
import Card from '../common/Card'

const SearchPage = () => {
  const dispatch = useDispatch()
  const exps = useSelector(getExps)
  const expsStatus = useSelector(getExpsStatus)
  //const expsError = useSelector(getExpsError)

  const location = useLocation()
  const [param, setParam] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [searchResults, setSearchResults] = useState([])

  const getPathSearch = () => {
    const queryString = location.search
    const urlParams = new URLSearchParams(queryString)
    const searchParamValue = urlParams.get('search')

    if (searchParamValue) {
      setParam(searchParamValue)
    }
  }

  const loadResults = () => {
    let expsResult = exps.filter(item => item.title.toLowerCase().includes(param.toLowerCase()) ||item.category.toLowerCase().includes(param.toLowerCase()))
    setSearchResults(expsResult)
    setIsLoading(false)
  }

  useEffect(() => {
    if (expsStatus === 'idle') {
      dispatch(fetchExps())
    }

    if (expsStatus === 'succeeded' && param) {
      loadResults()
    }
  }, [expsStatus, dispatch])

  useEffect(() => {
    getPathSearch()
  }, [])

  return <div className="page search">
      <div className="container">
        <div className="wrapper">

            { !isLoading && searchResults.length > 0 &&
            <>
              <div className="top">
                <h2 className="title">Results for <span>{param}</span></h2>
              </div>

              <div className="content">
                {
                  searchResults.map((ele, i) => {

                    return <Fragment key={`searchExp-${ele._id}`}>
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
}

export default SearchPage