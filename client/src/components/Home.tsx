
import Carousel from './Carousel.js'
import LastExperiences from './experiences/LastExperiences.js'
import Timeline from './Timeline.js'
import BestExperiences from './experiences/BestExperiences.js'

const Home = () => {

  return <div className="page home">
    <Carousel />

    <div className="block">
      <div className="container">
        <LastExperiences />
      </div>
    </div>

      <div className="block">
        <Timeline />
      </div>

      <div className="block">
        <div className="container">
          <BestExperiences />
        </div>
      </div>
    </div>
}

export default Home