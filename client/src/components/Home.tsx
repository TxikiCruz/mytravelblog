
import Carousel from './Carousel.js'
//import Map from './Map.js'
import LastExperiences from './LastExperiences'
import Timeline from './Timeline.js'
import BestExperiences from './BestExperiences'

const Home = () => {

  return <div className="page home">
    {/* <Map /> */}

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