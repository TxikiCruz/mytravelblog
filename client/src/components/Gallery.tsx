import { useState, useEffect } from "react"
import { chunk } from 'lodash'
import { MdArrowUpward } from 'react-icons/md'
import { useAppSelector, useAppDispatch } from "../hooks/useDispatchSelector"
import { Experience, experiencesSelector, fetchExperiences } from "../store/slice-experiences"
import { URL } from '../config'
import { scrollToTop } from '../utils/utils'

const Gallery = () => {
  // fetch Experiences
  const [experiences, setExperiences] = useState<Array<Experience>>([])
  const [experiencesByGroup, setExperiencesByGroup] = useState([])
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

  // Filter and Group experiences in chunks of 3
  useEffect(() => {
    const expsWithImage = experiences.filter((exp) => exp.image).sort(() => Math.random() - 0.5)
    const chunks = chunk(expsWithImage, 3)
    setExperiencesByGroup(chunks)
  }, [experiences])

  const getImageClass = (index: number) => {
    return index % 2 ? 'gallery_chunk--right' : 'gallery_chunk--left'
  }

  // For Show more button
  const chunksPerRow = 2
  const [next, setNext] = useState(chunksPerRow)
  const handleMoreChunks = () => {
    setNext(next + chunksPerRow)
  }

  return <div className="page gallery">
    <div className="container">
      <div className="wrapper">
        <div className="top">
          <h2 className="title">Gallery</h2>
        </div>

        <div className="content">
          <div className="gallery_content">
          {
            !loading && experiencesByGroup.slice(0, next)?.map((item, idx) => {
              return <div key={`chunk-${idx}`} className={`gallery_chunk ${getImageClass(idx)}`}>
                {
                  item.map((ele: Experience) => {
                    return <div key={ele._id} className="gallery_item">
                      <img loading="lazy" src={`${URL}/static/images/${ele.image}`} alt={ele.title} />
                      <span className="card_category">{ele.category}</span>
                    </div>
                  })
                }
              </div>
            })
          }
          </div>

          { next < experiencesByGroup?.length && (
            <div className="gallery_actions">
              <button className="btn btn_show_more" onClick={handleMoreChunks}>Show more</button>
              <button className="btn_icon btn_top" onClick={scrollToTop}>
                <MdArrowUpward />
              </button>
            </div>
          )}

          {error}
        </div>
      </div>
    </div>
  </div>
}

export default Gallery