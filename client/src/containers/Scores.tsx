import { useState, useEffect } from 'react'
import axios from 'axios'
import { MdDelete, MdEdit, MdClose, MdCheckCircle } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../hooks/useDispatchSelector'
import { ScoreType, fetchScores, scoresSelector } from '../store/slice-scores'
//import { useSelector, useDispatch } from 'react-redux'
//import { getScores, getScoresStatus, getScoresError, fetchScores } from '../store/slice-scores'
import { URL } from '../config'
import Pagination from '../components/common/Pagination'
import Msgbox from '../components/common/Msgbox'

const Scores = () => {
  // fetch scores
  const [scores, setScores] = useState<Array<ScoreType>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const selectedScores = useAppSelector(scoresSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setLoading(selectedScores.loading)
    setError(selectedScores.error)
    setScores(selectedScores.scores)
  }, [selectedScores])

  function handleFetchScores() {
    dispatch(fetchScores())
  }

  useEffect(() => {
    handleFetchScores()
  }, [])

  const [newValues, setNewValues] = useState({ score: '' })
  const [message, setMessage] = useState({ body: '', classname: '' })
  const [updateActive, setUpdateActive] = useState(null)

  // const dispatch = useDispatch()
  // const scores = useSelector(getScores)
  // const scoresStatus = useSelector(getScoresStatus)
  // const error = useSelector(getScoresError)

  // useEffect(() => {
  //   if (scoresStatus === 'idle') {
  //     dispatch(fetchScores())
  //   }
  // }, [scoresStatus, dispatch])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentScores = scores.slice(indexOfFirstItem, indexOfLastItem)
  const paginate = (i: number) => setCurrentPage(i)

  const handleChangeNew = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    if (target) setNewValues({ ...newValues, [target.name]: target.value })
  }

  const onClickDelete = async (id: string) => {
    try {
      let url = `${URL}/admin/scores/delete`
      await axios.post(url, { _id: id })
      handleFetchScores()
      setMessage({ body: `Score deleted!`, classname: 'msg ok' })
    } catch (error) {
      console.log(error)
    }
  }

  const onClickShowUpdate = (e, id) => {
    e.preventDefault()
    setUpdateActive(id)
    let idx = scores.findIndex(e => e._id === id)
    setNewValues({ experience: scores[idx].experience, user: scores[idx].user, score: scores[idx].score })
  }

  const onClickClose = () => {
    setUpdateActive(null)
  }

  const onClickUpdate = async (id) => {
    try {
      let url = `${URL}/admin/scores/update`
      if (newValues.score !== '') {
        await axios.post(url, { _id: id, experience: newValues.experience, user: newValues.user, score: newValues.score })
        //getScores()
        setUpdateActive(null)
        setMessage({ body: `Score updated!`, classname: 'msg ok' })
      } else {
        setMessage({ body: 'Write a score', classname: 'msg error' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <div className="content scores">
    <div className="content_top">
      <h2 className="content_top_title">Scores</h2>
    </div>

    <div className="table">
      <div className="tGroup tHead">
        <div className="tRow">
          <div className="tCol w40"><span><strong>Experience</strong></span></div>
          <div className="tCol w30"><span><strong>User</strong></span></div>
          <div className="tCol w20 center"><span><strong>Score</strong></span></div>
          <div className="tCol w10 right"><span><strong>Action</strong></span></div>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {
        currentScores.map((ele, i) => {
          return <div className="tGroup" key={ele._id}>
            <div className="tRow">
              <div className="tCol">
                <span>{ele.experience}</span>
              </div>
              <div className="tCol">
                <span>{ele.user}</span>
              </div>
              <div className="tCol center">
                <span>{ele.score}</span>
              </div>
              <div className="tCol center">
                <div className="icons">
                  {updateActive === null ?
                    <button type="button" className="btn_action" onClick={(e) => onClickShowUpdate(e, ele._id)}>
                      <MdEdit />
                    </button>
                    : null}
                  <button type="button" className="btn_action" onClick={() => onClickDelete(ele._id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>

            {updateActive === ele._id ?
              <>
                <div className="tRow sup">
                  <div className="tCol">
                  </div>
                  <div className="tCol">
                  </div>
                  <div className="tCol">
                    <input type="text" name="score" className="form_control" placeholder="new score" onChange={handleChangeNew} defaultValue={ele.score} />
                  </div>
                  <div className="tCol">
                    <div className="icons">
                      <button type="button" className="btn_action" onClick={() => onClickUpdate(ele._id)}>
                        <MdCheckCircle />
                      </button>
                      <button type="button" className="btn_action" onClick={onClickClose}>
                        <MdClose />
                      </button>
                    </div>
                  </div>
                </div>
              </>
              : null}
          </div>
        })
      }
    </div>

    {
      scores.length > 0 && scores.length > itemsPerPage &&

      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={scores.length}
        paginate={paginate}
      />
    }

    <Msgbox message={message.body} classname={message.classname} />
  </div>
}

export default Scores
