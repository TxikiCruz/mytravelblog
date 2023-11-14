import { useState, useEffect } from 'react'
import axios from 'axios'
import { URL } from '../config'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Spinner from './common/Spinner'

const Slideshow = () => {
  const [slideImages, setSlideImages] = useState<Array<Object>>([])
  const [slideIndex, setSlideIndex] = useState<number>(0)
  const [slideStop, setSlideStop] = useState<boolean>(false)
  const [slidePosition, setSlidePosition] = useState<number>(window.innerWidth)
  const windowWidth = window.innerWidth
  const time = 2000

  type Image = {
    filename: string,
    pathname: string
  }

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(`${URL}/images/fetch_images`)
      let data = res.data.images
      //console.log(data)
      let temp: any[] = []
      for (let ele of data) {
        if (ele.featured) {
          temp.push(ele)
        }
      }
      setSlideImages(temp)
      //setSlideStop(true)
    }

    fetchImages()
  }, [slideImages])

  const getPositionImage = (idx) => {
    return -(slidePosition * idx)
  }

  const handleClickPrev = () => {
    setSlideStop(true)
    let numSlides = slideImages.length
    let idx = slideIndex
    if (idx === 0) {
      setSlideIndex(numSlides - 1)
    } else {
      setSlideIndex(idx - 1)
    }
  }

  const handleClickNext = () => {
    const newPos = slidePosition - windowWidth
    setSlidePosition(newPos)
  }

  const onClickDot = (i: number) => {
    setSlideStop(true)
    setSlideIndex(i)
  }

  return <div className="carousel">
    { slideImages.length > 0 ?
      <>
      {
        slideImages.map((ele, i) => {
            return <img 
              key={ele._id}
              src={`${URL}/static/images/${ele.filename}`} 
              className="carousel_image" 
              style={{ left: getPositionImage(i)} }
              alt="title" 
            />
          })
        }
      </>
      : <Spinner />
    }

    <div className="navs">
      <button className="nav prev" onClick={handleClickPrev}>
        <MdChevronLeft />
      </button>
      <span className="nav next" onClick={handleClickNext}>
        <MdChevronRight />
      </span>
    </div>

    <div className="dots">
      {
        slideImages.map((ele, i) => {
          return <span className={slideIndex === i ? 'dot active' : 'dot'} key={ele._id} onClick={() => onClickDot(i)}></span>
        })
      }
    </div>
  </div>
}

export default Slideshow