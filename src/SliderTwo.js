import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { dataTwo } from './dataTwo';

function ControlledCarouselTwo() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    };

return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
        {dataTwo.map((slide, i) => {
        return (
        <Carousel.Item key={i} interval={1500}>
            <img className='carouselImg' src={slide.image} alt='slide' width="500px"/>
            
        </Carousel.Item>
        )
        })}
    </Carousel>
);
}

export default ControlledCarouselTwo;