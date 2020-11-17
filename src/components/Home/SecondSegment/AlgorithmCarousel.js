import Slider from 'react-slick';
import LinearRegressionCard from './LinearRegressionCard';
import LogisticRegressionCard from './LogisticRegressionCard';
import NeuralNetworkCard from './NeuralNetworkCard';
import KNearestNeighborsCard from './KNearestNeighborsCard';
import KMeanCard from './KMeanCard';
import ObjectDetectionCard from './ObjectDetectionCard';

const AlgorithmCarousel = (props) => {
    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    }

    return (
        <Slider {...settings}>
            <div>
                <LinearRegressionCard/>
            </div>
            <div>
                <LogisticRegressionCard/>
            </div>
            <div>
                <NeuralNetworkCard/>
            </div>
            <div>
                <KNearestNeighborsCard/>
            </div>
            <div>
                <KMeanCard/>
            </div>
            <div>
                <ObjectDetectionCard/>
            </div>
        </Slider>
      );
}

export default AlgorithmCarousel;