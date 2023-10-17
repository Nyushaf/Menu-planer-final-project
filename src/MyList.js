const MyList = ({mealPlans, removeDay, selectedDay, setSelectedDay}) => {
    
    return(
        <div className="cont-week-menu">
            {mealPlans.map(({title, id, mealForADay}) => {
                return(
                <div key={id} className={`cont-day ${id === selectedDay ? "selected" : "default"}`} onClick={() => setSelectedDay(id)}>
                    <p className="title">{title}</p>
                    <p className="meal">{mealForADay.substring(0, 60)}</p>
                    <button className={`btn-delete-day ${id === selectedDay ? "selected-btn" : "default-btn"}`} onClick= {()=> removeDay(id)}>Delete Day</button>
                </div>
            )})}
        </div>
    )
}
export default MyList;