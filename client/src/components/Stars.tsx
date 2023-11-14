import { useState } from 'react'
import axios from 'axios'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { URL } from '../config'
import Msgbox from './common/Msgbox'

const Stars = ({ exp, user }) => {
  const [message, setMessage] = useState({ body: '', classname: '' })
  const [starHover, setStarHover] = useState(null)
  const stars = []
  const numStars = 5

  for (let i = 0; i < numStars; i++) {
    stars.push(`score${i}`)
  }

  const handleMouseOver = (i) => {
    return setStarHover(i)
  }

  const handleMouseOut = () => {
    return setStarHover(0)
  }

  const onClickScore = async (i) => {
    try {
      let url = `${URL}/admin/scores/add`
      await axios.post(url, { experience: exp, user: user, score: i + 1 })
      //loadScores()
      setMessage({ body: `Score added!`, classname: 'msg_ok' })
    } catch (error) {
      console.log(error)
    }
  }

  return <div className="stars">
    {
      stars.map((ele, i) => {
        return <button
          key={`star-${i}`}
          name={ele}
          className="btn_icon"
          onMouseOver={() => handleMouseOver(i)}
          onMouseOut={() => handleMouseOut()}
          onClick={() => onClickScore(i)}
        >{starHover === i ? <MdStar /> : <MdStarBorder />}</button>
      })
    }

    <Msgbox message={message.body} classname={message.classname} />
  </div>
}

export default Stars