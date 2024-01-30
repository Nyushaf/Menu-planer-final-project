import { useEffect, useState } from 'react';
import MyList from './MyList';
import MyMealsAndIngredients from './MyMealsAndIngredients';
import meal from './Image/meal.png';


function PlanMenu({myList, setMyList}) {
    const [mealPlans, setMealPlans] = useState(
        localStorage.mealPlans ? JSON.parse(localStorage.mealPlans) : []);

    const [selectedDay, setSelectedDay] = useState(false);

    const uniqueId = () => {
        return new Date().getTime();
    }

    const addMeal = () => {
        const newDay = {
            title: "",
            id: uniqueId(),
            mealForADay: "",
            ingredients: ""
        }
        setMealPlans([newDay, ...mealPlans]);
    }
        
    const deleteDay = (id) => {
            setMealPlans(mealPlans.filter(day => day.id !== id))
    }
    
    const updateDay = (myUpdateMeal) => {
        const updateMeals = mealPlans.map((mealPlan) => {
            if (mealPlan.id === myUpdateMeal.id) {
                return myUpdateMeal;
            }
            return mealPlan;
        })
        setMealPlans(updateMeals)
    }
    
    const getActiveMeal = () => {
        return mealPlans.find(({id})=> id === selectedDay)
    }

    useEffect(() => {
        localStorage.setItem("mealPlans", JSON.stringify(mealPlans))
    }, [mealPlans])
    
    return(
        <div className='recipe-container'>
            <div className="center">
                <h2 className='cont-plan-meny'>Create Your Weekly Meal Plan</h2>
            </div>
            <div className="center">
                <button className="btn-ingr" onClick={addMeal}>Add Day <img src={meal} alt="meal" width="50px" /></button>
            </div>
            <br />
            <div>
                <MyMealsAndIngredients
                selectedDay = {getActiveMeal()}
                setSelectedDay = {setSelectedDay}
                updateDay = {updateDay}
                setMyList = {setMyList}
                myList={myList}
                />
            </div>
            <br />
            <div>
                <MyList
                mealPlans = {mealPlans}
                removeDay = {deleteDay}
                selectedDay = {selectedDay}
                setSelectedDay = {setSelectedDay}/>
            </div>
            
        </div>
    )
}
export default PlanMenu;