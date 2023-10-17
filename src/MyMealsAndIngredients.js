const MyMealsAndIngredients = ({selectedDay, updateDay, setMyList, myList}) => {

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
    }

    if (!selectedDay) return <h3 className="center cont-started">Get Started!</h3>
    return(
        <div>
            <div className="cont-input">
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
                <textarea 
                placeholder="Write your meal plan here..."
                id="mealForADay"
                value={selectedDay.mealForADay}
                onChange={(e) => editMyMeal("mealForADay", e.target.value)}
                />

                <textarea 
                placeholder="List of ingredients..."
                id="ingredients"
                value={selectedDay.ingredients}
                onChange={(e) => editMyMeal("ingredients", e.target.value)}
                />
            </div>
            <div className="btn-position">
                <button className="btn-add-to-list" onClick={() => addIngredients(selectedDay.ingredients)}>Add to Shopping List</button>
            </div>
        </div>
    )
}
export default MyMealsAndIngredients;