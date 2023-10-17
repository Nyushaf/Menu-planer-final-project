import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { data } from './data';
function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    };

return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
        {data.map((slide, i) => {
        return (
        <Carousel.Item key={i} interval={2000}>
            <img src={slide.image} alt='slide' width="600px"/>
            <Carousel.Caption>
                <div className='clider-text'>
                    <p>{slide.text}</p>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
        )
        })}
    </Carousel>
);
}

export default ControlledCarousel;