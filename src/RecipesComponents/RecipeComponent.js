import { useState } from "react";
import Modal from "./Modal";
import Content from "./Content";

function RecipeComponent({label, image, calories, ingredients}) {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="recipe-card">
            <div className="container">
                <h2 className="recipe-name">{label}</h2>
            </div>
            <div className="container">
                <img className="recipe-img" src={image} alt="food" />
            </div>
            <div className="container">
                <p className="calories">{Math.round(calories)} calories</p>
            </div>
            <div className="container">
                <button className="btn-ingr" onClick = {() => setIsOpen(true)}>Show ingredients</button>
            </div>
            {isOpen && 
            <Modal 
            setIsOpen = {setIsOpen}
            ingredients = {ingredients}>
                <Content 
                setIsOpen = {setIsOpen}
                ingredients = {ingredients} />
            </Modal>
            }
            
        </div>
    )
}
export default RecipeComponent;