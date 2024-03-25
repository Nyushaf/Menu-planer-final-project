export const MyDays = ({ days, removeDay, handleChange  }) => {
    return(
        <div>
        {days.map((day) => (
            <div key={day.id} className='dayOfTheWeek'>
                <div className='meals'>
                <span className='important'>*</span>
                <select className='dayName' name="dayName" value={day.dayName} onChange={(e) => handleChange(day.id, e)}>
                    <option value="">Select a day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
                    <div>
                        <label className='lableForAWeek' htmlFor="breakfast">Breakfast</label><br />
                        <input className='inputForAWeek' type="text" name="breakfast" value={day.breakfast} onChange={(e) => handleChange(day.id, e)} placeholder='Enter meals' />
                    </div>
                    <div>
                        <label className='lableForAWeek' htmlFor="lunch">Lunch</label><br />
                        <input className='inputForAWeek' type="text" name="lunch" value={day.lunch} onChange={(e) => handleChange(day.id, e)} placeholder='Enter meals' />
                    </div>
                    <div>
                        <label className='lableForAWeek' htmlFor="dinner">Dinner</label><br />
                        <input className='inputForAWeek' type="text" name="dinner" value={day.dinner} onChange={(e) => handleChange(day.id, e)} placeholder='Enter meals' />
                    </div>
                    <button className='removeDay' onClick={() => removeDay(day.id)}>Remove Day</button>
                </div>
                <div className='ingredients'>
                    <label className='lableForAWeek'>Ingredients</label>
                    <textarea className='textareaForADay' name="ingredients" value={day.ingredients} onChange={(e) => handleChange(day.id, e)} placeholder='Enter ingredients' />
                </div>
            </div>
        ))}
        </div>
    )
}