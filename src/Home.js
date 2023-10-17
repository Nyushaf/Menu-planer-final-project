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
        text: "Welcome to my portfolio",
        duration: 4,
        delay: 9.2,  
        ease: 'power1.in',
        repeat: 0,
        repeatDelay: .7,
        yoyo: false,
    });
    }, []);

    return(
        <div>
            <div className="welcome-container">
                <h1 ref={titleRef}>👨‍🍳 Welcome to the menu planer</h1>
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