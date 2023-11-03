import ControlledCarousel from "./Slider";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useEffect, useRef } from "react";
import NutritionAnalysis from "./NutritionAnalusis";
import nutrition from "./Image/nutrition.jpg";
import recipe from "./Image/recipes.jpg";
import plan from "./Image/plan.jpg";
import list from "./Image/list.jpg";


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
        <div className="home-container">
            <div className="welcome-container">
                <h1 className="welcome-text" ref={titleRef}> </h1>
            </div>
            <div className="center">
                <div className="carusel-container">
                    <ControlledCarousel/>
                </div>
            </div>
            <br />
            <div className="about-color">
                <div className="center">
                    <h3 className="how-to-use">How to use</h3>
                </div>
            <div className="about-cont">
                <div className="about">
                    <img src={nutrition} alt="nutrition" width="350px"/>
                    <p>Count calories and check the nutritional value of your meals. To do this simply enter all ingredients separated by commas, making sure to include the quantity (cup, oz, g, etc.). Press Enter or the search button to display the result. To get a correct result, make sure that the ingredients are entered without errors and that the quantities are correct. <b>Example: 100 g chicken, 1 cup milk.</b></p>
                </div>
                <div className="about">
                    <img src={recipe} alt="recipe" width="350px"/>
                    <p>Match recipes to your ingredients. Enter ingredients separated by commas. Press Enter or the search button to display recipes that include your ingredients. <b>Example: chicken, apple.</b></p>
                </div>
                <div className="about">
                    <img src={plan} alt="plan" width="350px"/>
                    <p>Make a menu for each day. Simply add a new day using the Add Day button. Click on the day you want to edit. Enter all the meals for that day in the corresponding field. Write down the ingredients you will need. If necessary, you can add ingredients to your shopping list.</p>
                </div>
                <div className="about">
                    <img src={list} alt="list" width="350px"/>
                    <p>Make and edit your shopping list. Ingredients are added to the list from your daily menu plan. Delete ingredients individually or all at once. For convenience, you can print your shopping list.</p>
                </div>
            </div>
            </div>
            <br />
            <div className="container-nutrition" id="nutrition">
                <NutritionAnalysis/>
            </div>
        </div>
            
    )
}
export default Home;