import ContentModalPlanMenu from "./ContentModalPlanMenu";
import ModalPlanMenu from "./ModalPlanMenu";


const MyMealsAndIngredients = ({selectedDay, setSelectedDay, updateDay, setMyList, myList}) => {

    if (!selectedDay) return <h3 className="center cont-started">Get Started!</h3>
    return(
        <ModalPlanMenu >
            <ContentModalPlanMenu 
                selectedDay={selectedDay}
                setSelectedDay = {setSelectedDay}
                updateDay = {updateDay}
                setMyList = {setMyList}
                myList={myList}/>
        </ModalPlanMenu>
    )
}
export default MyMealsAndIngredients;