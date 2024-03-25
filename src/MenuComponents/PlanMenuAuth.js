import './Menu.css';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MyWeek } from './MyWeeks';
import deleteIcon from '../Image/delete90.png';
import meal from '../Image/meal.png';
import { MyDays } from './MyDays';
import { deleteWeek, editUserWeek, getAllUserWeek, saveUserWeek } from './FetchWeek';


function PlanMenuAuth ({userWeek, setUserWeek, userId}) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [weekId, setWeekId] = useState(null);
    const [weekName, setWeekName] = useState('');
    const [days, setDays] = useState([{ id: uuidv4(), dayName: '', breakfast: '', lunch: '', dinner: '', ingredients: '' }]);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    /*const { user } = useAuth0();
    const userId = user && user.sub ? user.sub.split('|').pop() : '';*/
    const addDay = () => {
        setDays([...days, { id: uuidv4(), dayName: '', breakfast: '', lunch: '', dinner: '', ingredients: '' }]);
    };
    
    const handleChange = (id, event) => {
        const { name, value } = event.target;
        const updatedDays = days.map(day => (day.id === id ? { ...day, [name]: value } : day));
        setDays(updatedDays);
    }
    
    const removeDay = (id) => {
        const updatedDays = days.filter(day => day.id !== id);
        setDays(updatedDays);
    };
    
    const checkFields = useCallback(() => {
        if (weekName.trim() === '') return false;
        for (let day of days) {
            if (day.dayName.trim() === '') return false;
        }
        return true;
    }, [weekName, days]);
    
    useEffect(() => {
        setIsSaveEnabled(checkFields());
    }, [weekName, days, checkFields]);
    
    const handleSaveWeek = () => {
        saveUserWeek(userId, weekName, days)
        .then(() => {
            getAllUserWeek(userId, setUserWeek);
            setWeekName('');
            setDays([{ id: uuidv4(), dayName: '', breakfast: '', lunch: '', dinner: '', ingredients: '' }]);
            setShowForm(false);
            alert('Week saved');
        })
        .catch((error) => {
            console.error('Error saving week:', error);
            alert('Something went wrong. Try again, please!')
        });
    };
    
    const handleEditWeek = (weekId, weekName, days) => {
        setWeekName(weekName);
        setDays([...days]);
        setEditing(true);
        setShowForm(true);
        setWeekId(weekId)
    };
    
    const handleSaveEditedWeek = () => {
        editUserWeek(weekId, weekName, days)
        .then(() => {
            getAllUserWeek(userId, setUserWeek);
            setWeekName('');
            setDays([{ id: uuidv4(), dayName: '', breakfast: '', lunch: '', dinner: '', ingredients: '' }]);
            setEditing(false);
            setShowForm(false);
            alert('Week edited and saved');
        })
        .catch((error) => {
            console.error('Error editing week:', error);
            alert('Something went wrong. Try again, please!')
        });
    };
    
    const handleDeleteWeek = (weekId) => {
        console.log('Deleting week with id in handle:', weekId);
        deleteWeek(weekId)
        .then(() => {
            getAllUserWeek(userId, setUserWeek);
        })
        .catch((error) => {
            console.error('Error deleting week:', error);
        });
    };

    const closeForm = () => {
        setWeekName('');
        setDays([{ id: uuidv4(), dayName: '', breakfast: '', lunch: '', dinner: '', ingredients: '' }]);
        setEditing(false);
        setShowForm(false);
    }

    return(
        <div className='recipe-container'>
            <div>
                <div className="center">
                    <h2 className='cont-plan-meny'>Create Your Weekly Meal Plan</h2>
                </div>
                <div className='main-container-for-weeks plan-menu-position'>
                    <div className='weeks'>
                        <button className='btn-delete-list' onClick={() => setShowForm(true)}>Create new week <img src={meal} alt="meal" width="50px" /></button>
                        <div>
                            <MyWeek userWeek = {userWeek} onDeleteWeek = {handleDeleteWeek} onEditWeek={handleEditWeek}/>
                        </div>
                    </div>
                    {showForm && (
                        <div className='form'>
                            <div className='delete-icon-position'>
                                <img className='delete-icon' onClick={closeForm} src={deleteIcon} alt="delete"width="30px" />
                            </div>
                            <div className='week-name-container'>
                                <label className='week-name' htmlFor="weekName"><span className='important'>*</span>Week: </label>
                                <input className='week-name' type="text" id='weekName' value={weekName} onChange={(e) => setWeekName(e.target.value)} placeholder='Week name' />
                            </div>
                            <MyDays days={days} removeDay={removeDay} handleChange={handleChange}/>
                            <div className="center">
                                <button className='addNewDay' onClick={addDay}>Add Day</button>
                            </div>
                            <div className='btn-save-container'>
                                {editing ? (
                                    <button className='saveWeekBtn' onClick={handleSaveEditedWeek}>Save Edited Week</button>
                                    ) : (
                                    <button className='saveWeekBtn' disabled={!isSaveEnabled} onClick={handleSaveWeek}>Save</button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default PlanMenuAuth;