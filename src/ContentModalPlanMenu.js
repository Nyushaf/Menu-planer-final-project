import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ContentModalPlanMenu = ({selectedDay, setSelectedDay, updateDay, setMyList, myList}) => {

    const editMyMeal = (myInput, value) => {
        updateDay({
            ...selectedDay,
            [myInput]: value
        })
    }

    const addIngredients = (value) => {
        if (value) {
            const newIngredients = value
            .split(",")
            .map((ingredient) => 
            ingredient.trim().toLowerCase());
            const filtederIngredients = newIngredients.filter((ingredient) => !myList.includes(ingredient));
            setMyList(myList.concat(filtederIngredients));
        }
        setSelectedDay(false);
    }

    return(
        <div className="container-meals-and-ingr">
            <div className="cont-textarea">
                <input 
                type="text"
                className="myInput"
                placeholder="Today is..."
                id="title"
                value={selectedDay.title}
                onChange={(e) => editMyMeal("title", e.target.value)}
                />
            </div>
            
            <div className="cont-textarea">
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">✦ Add your meal for the day</Tooltip>}>
                <span className="d-inline-block textarea-span">
                <textarea 
                className="textarea"
                placeholder="Write your meal plan here..."
                id="mealForADay"
                value={selectedDay.mealForADay}
                onChange={(e) => editMyMeal("mealForADay", e.target.value)}
                />
                </span>
            </OverlayTrigger>
            </div>

            <div className="cont-textarea">
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">✦ Enter the ingredients separated by commas</Tooltip>}>
                <span className="d-inline-block textarea-span">
                <textarea 
                className="textarea"
                placeholder="List of ingredients..."
                id="ingredients"
                value={selectedDay.ingredients}
                onChange={(e) => editMyMeal("ingredients", e.target.value)}
                />
                </span>
            </OverlayTrigger>
            </div>
            <div className="btn-position">
                <button className="btn-add-to-list" onClick={() => addIngredients(selectedDay.ingredients)}>Submit Day and Update Shopping List</button>
            </div>
        </div>
    )
}
export default ContentModalPlanMenu;