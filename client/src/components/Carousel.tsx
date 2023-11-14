import { useState, useEffect } from 'react'
import axios from 'axios'
import { URL } from '../config'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Spinner from './common/Spinner'

const Carousel = () => {
  const [slideImages, setSlideImages] = useState<Array<Object>>([])
  const [slideIndex, setSlideIndex] = useState<number>(0)
  const [slideStop, setSlideStop] = useState<boolean>(true)
  const [objCarouselImage, setObjCarouselImage] = useState<CarouselImage>({})
  const numSlides = slideImages.length
  const time = 5000

  type CarouselImage = {
    filename?: string,
    pathname?: string,
    featured?: boolean,
    title?: string,
    readonly _id?: string
  }

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get(`${URL}/images/fetch_images`)
      let data = res.data.images
      let temp: any[] = []
      for (let ele of data) {
        if (ele.featured) {
          temp.push(ele)
        }
      }
      setSlideImages(temp)
    }

    fetchImages()
  }, [])

  useEffect(() => {
    setObjCarouselImage(slideImages[slideIndex])
  }, [slideImages, slideIndex])

  const getUrlImage = () => {
    return `${URL}/static/images/${objCarouselImage?.filename}`
  }

  const getTitleImage = () => {
    return objCarouselImage?.title
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!slideStop) {
        autoPlayAndClickNext()
      }
    }, time)
    return () => clearInterval(interval)
  }, [slideIndex])

  const handleClickPrev = () => {
    setSlideStop(true)
    if (slideIndex === 0) {
      setSlideIndex(numSlides - 1)
    } else {
      setSlideIndex(slideIndex - 1)
    }
  }

  const handleClickNext = () => {
    setSlideStop(true)
    autoPlayAndClickNext()
  }

  const autoPlayAndClickNext = () => {
    if (slideIndex === numSlides - 1) {
      setSlideIndex(0)
    } else {
      setSlideIndex(slideIndex + 1)
    }
  }

  const onClickDot = (i: number) => {
    setSlideStop(true)
    setSlideIndex(i)
  }

  return <div className="carousel">
    <div className="carousel_wrapper">
      <div className="carousel_title">
        <h2>Score Travels</h2>
        <p>Help the trips to highlight!</p>
      </div>

      <div className="carousel_images">
        {
          slideImages.length > 0 ?
            <img src={getUrlImage()} className="carousel_image" alt={getTitleImage()} />
          : <Spinner />
        }
      </div>
    </div>

    <div className="carousel_navs">
      <button className="carousel_nav prev" onClick={handleClickPrev}>
        <MdChevronLeft />
      </button>
      <button className="carousel_nav next" onClick={handleClickNext}>
        <MdChevronRight />
      </button>
    </div>

    <div className="carousel_dots">
      {
        slideImages.map((ele: CarouselImage, i: number) => {
          return <button 
            key={ele._id}
            className={`carousel_dot ${slideIndex === i && 'active'}`} 
            onClick={() => onClickDot(i)}></button>
        })
      }
    </div>
  </div>
}

export default Carousel