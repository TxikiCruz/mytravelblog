import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatchSelector'
import { Experience, fetchExperiences, experiencesSelector } from '../../store/slice-experiences'
import { sortBy } from 'lodash'
import Card from '../common/Card'

const LastExperiences = () => {
  // fetch Experiences
  const [experiences, setExperiences] = useState<Array<Experience>>([])
  const [experiencesLast, setExperiencesLast] = useState<Array<Experience>>([])
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

  useEffect(() => {
    const numDisplay = 3
    const sortedExps = sortBy(experiences, ['date']).reverse()
    const lastExps = sortedExps.slice(0, numDisplay)
    setExperiencesLast(lastExps)
  }, [experiences])

  return <div className="modLastExps">
    <h2>Last Experiences</h2>

    <div className="flex">
      {
        !loading && experiencesLast.map(ele => {

          return <Card
            key={`lastExp-${ele._id}`}
            _id={ele._id}
            title={ele.title}
            category={ele.category}
            content={ele.content}
            date={ele.date}
            score={ele.score}
            image={ele.image}
          />
        })
      }
      {error}
    </div>
  </div>
}

export default LastExperiences