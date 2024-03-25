import './ShoppingList.css';
import delet from '../Image/delete.png';
import print from '../Image/print.png';
const ShoppingList = ({myList, setMyList}) => {

    const deletedItem = (itemToDeleted) => {
        const newList = myList.filter((item) => item !== itemToDeleted);
        setMyList(newList);
    }
    
    return(
        <div className='recipe-container'>
            <div className="center">
                <h2 className="cont-plan-meny">My Shopping List</h2>
            </div>
            
            <div className="container-shoppingList">
                <div className="cont-shopping-color">
                <ol>
                {myList.map((item, index) => (
                    <div key = {index} className='cont-li'>
                        <li>{item}</li>
                        <button className='btn-delete-item'onClick={() => deletedItem(item)}><img src={delet} alt="delet" width="20px" /></button>
                    </div>
                ))}
                </ol>
                <p>You have <span className="item">{myList.length}</span> items in Shopping list</p>
                <div className="center">
                    <button className="btn-delete-list" onClick={() => setMyList([])}>Delete All</button>
                    <button className="btn-print-list">Print <img src={print} alt="print" width="30px" /></button>
                </div>
                </div>
                
            </div>
            
        </div>
    )
}
export default ShoppingList;