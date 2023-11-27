import { useState, useEffect } from 'react'
import { sortBy } from "lodash"
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatchSelector'
import { Experience, fetchExperiences, experiencesSelector } from '../../store/slice-experiences-new'
import Card, { PropsCard } from '../common/Card'
import Pagination from '../common/Pagination'

const AllExperiences = () => {
  // fetch Experiences
  const [experiences, setExperiences] = useState<Array<Experience>>([])
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

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const sortedExps = sortBy(experiences, ['date']).reverse()
  const currentExps = sortedExps.slice(indexOfFirstItem, indexOfLastItem)
  const paginate = (i: number) => setCurrentPage(i)

  return <div className="page experiences">
    <div className="container">
      <div className="wrapper">
        <div className="top">
          <h2 className="title">All Experiences</h2>
        </div>

        <div className="content flex">
          {
            currentExps.map((ele: PropsCard) => {

              return <Card
                key={`exp-${ele._id}`}
                category={ele.category}
                content={ele.content}
                score={ele.score}
                date={ele.date}
                image={ele.image}
                title={ele.title}
                _id={ele._id}
              />
            })
          }
        </div>

        {
          experiences.length > 0 && experiences.length > itemsPerPage &&

          <Pagination
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalItems={experiences.length}
            paginate={paginate}
          />
        }
      </div>
    </div>
  </div>
}

export default AllExperiences