import ControlledCarousel from "./Slider";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef } from "react";


gsap.registerPlugin(TextPlugin);


function Home() {
    const titleRef = useRef(null);

    useEffect(() => {
    const title = titleRef.current;
    gsap.to(title, {
        text: "👨‍🍳 Welcome to the menu planer",
        duration: 4, 
        ease: 'power1.in',
        repeat: 2,
        repeatDelay: .7,
        yoyo: true
    });
    }, []);

    return(
        <div>
            <div className="welcome-container">
                <h1 ref={titleRef}> </h1>
            </div>
            <div className="center">
                <div className="carusel-container">
                    <ControlledCarousel/>
                </div>
            </div>
        </div>
            
    )
}
export default Home;