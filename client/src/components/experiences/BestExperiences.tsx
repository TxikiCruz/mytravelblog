import { useEffect, useState, Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatchSelector'
import { Experience, fetchExperiences, experiencesSelector } from '../../store/slice-experiences-new'
import { sortBy } from 'lodash'
import Card from '../common/Card'

const BestExperiences = () => {
  // fetch Experiences
  const [experiences, setExperiences] = useState<Array<Experience>>([])
  const [experiencesBest, setExperiencesBest] = useState<Array<Experience>>([])
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
    const sortedExps = sortBy(experiences, ['date'])
    const expsWithScore = sortedExps.filter(item => item.score != null)
    let bestExps = sortBy(expsWithScore, ['score']).reverse()
    bestExps = bestExps.slice(0, numDisplay)
    setExperiencesBest(bestExps)
  }, [experiences])

  return <div className="modLastExps">
    <h2>Best Experiences</h2>

    <div className="flex">
      {
        experiencesBest.map((ele, i) => {

          return <Fragment key={`bestExp-${ele._id}`}>
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
  </div>
}

export default BestExperiences