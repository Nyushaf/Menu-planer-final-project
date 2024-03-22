import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ShoppingListAuth = ({ userWeek }) => {

    const createPdf = (shoppingListData) => {
        const shoppingListContent = shoppingListData.map(item => `${item.quantity} ${item.unit} ${item.ingredient}`).join('\n');
            const documentDefinition = {
                content: [
                    { text: 'Your shopping list', style: 'header', alignment: 'center' },
                    { text: shoppingListContent, style: 'list', margin: [190, 0, 0, 0] }
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10]
                    },
                    list: {
                        fontSize: 14,
                        margin: [0, 0, 0, 10]
                    }
                }
            };
        pdfMake.createPdf(documentDefinition).open();
    };
    
    const handleCreatePDF = (weekId) => {
        const selectedWeek = userWeek.find((week) => week._id === weekId);
        if (selectedWeek) {
            const uniqueIngredients = {};

            selectedWeek.days.forEach((day) => {
                day.ingredients.split(',').forEach((ingredient) => {
                    const trimmedIngredient = ingredient.trim().toLowerCase();
                    if (trimmedIngredient !== '') {
                        if (!uniqueIngredients[trimmedIngredient]) {
                            uniqueIngredients[trimmedIngredient] = {
                                quantity: document.querySelector(`input[data-ingredient="${trimmedIngredient}"]`).value,
                                unit: document.querySelector(`select[data-ingredient="${trimmedIngredient}"]`).value,
                            };
                        }
                    }
                });
            });
            const shoppingListData = Object.keys(uniqueIngredients).map((ingredient) => ({
                ingredient: ingredient,
                quantity: uniqueIngredients[ingredient].quantity,
                unit: uniqueIngredients[ingredient].unit
            }));
    
            createPdf(shoppingListData);
        }
    };
    
    return(
        <div className='recipe-container'>
            <div className="center">
                <h2 className="cont-plan-meny">My Shopping List</h2>
            </div>
            <div className="center">
            <div className="accordion-width">
            {userWeek.map((week) => (
                <div key={week._id} className="accordion">
                    <div className="tab">
                        <input className="input" type="checkbox" id={`week-${week._id}`} />
                        <label htmlFor={`week-${week._id}`} className="tab__label" >
                            <p className="week-name">Week: {week.weekName}</p>
                        </label>
                        <div className="accordion-content tab__content" >
                            <ul>
                                {week.days.flatMap((day) => day.ingredients.split(',').map((ingredient) => ingredient.trim().toLowerCase())).filter((value, index, self) => value && self.indexOf(value) === index).map((ingredient, index) => (
                                    <li key={index}><p><input className='quantity' type="text" data-ingredient={ingredient} /> 
                                        <select className='qty' data-ingredient={ingredient}  >
                                            <option value="">qty</option>
                                            <option value="g">g</option>
                                            <option value="ml">ml</option>
                                            <option value="kg">kg</option>
                                            <option value="l">l</option>
                                            <option value="pc">pc</option>
                                            <option value="pkt">pkt</option>
                                        </select><span className='styleIngredients'>{ingredient}</span></p></li>
                                ))}
                            </ul>
                            <button className='createPdf' onClick={() => handleCreatePDF(week._id)}>Create PDF</button>
                        </div>
                    </div>
                </div>
                
            ))} 
            </div>
            </div>
        </div>
    )
}
export default ShoppingListAuth;