import { useEffect, useState } from 'react';
import ControlledCarouselTwo from './SliderTwo';
import search from './Image/search-1.png';
import cutlery from './Image/cutlery.png'
import RecipeComponent from './RecipeComponent';
import Swal from 'sweetalert2';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Recipes() {
    const [myRecipe, setMyRecipe] = useState([]);
    const [wordSubmitted, setWordSubmitted] = useState("salmon");
    const [mySearch, setMySearch] = useState("");

    useEffect(() => {
        const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=bd9168a6&app_key=%207f49185960b0639d86adb397c74bdca0`);
        const data = await response.json();
        if (data.hits.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingredient not found!',
            });
        } else {
            setMyRecipe(data.hits);
        }
        
    }
    getRecipes()
    }, [wordSubmitted])

    const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
    }

    const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
    }
    
    
    return(
        <div className='recipe-container'>
            <div className="big-container">
                <div className='container-find'>
                    <div className="center">
                        <h2 className="header-find">Find recipes</h2>
                    </div>
                    <div className='cont-input'>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">✦ You can enter one or more ingredients without a comma.</Tooltip>}>
                            <span className="d-inline-block">
                                <form onSubmit={finalSearch}>
                                    <input className='search' placeholder='Enter indredient...' onChange={myRecipeSearch}/>
                                </form>
                            </span>
                        </OverlayTrigger>
                        <button className='btn-search' onClick = {finalSearch}><img src={search} alt="search" width="50px" /></button>
                    </div>
                    <br />
                    <p className='text'>﹎﹎﹎﹎﹎﹎﹎﹎ <img src={cutlery} alt="cutlery" width='30px'/> ﹎﹎﹎﹎﹎﹎﹎﹎</p>
                    
                </div>
                <div className="center">
                    <div className="carusel-container-two">
                        <ControlledCarouselTwo/>
                    </div>
                </div>
            </div>
            <br />
            <div className='hr-container'> <hr /> </div>
            <br />
            <div className='recipes-container'>
                {myRecipe.map((element, index) => (
                    <RecipeComponent key = {index}
                    label = {element.recipe.label}
                    image = {element.recipe.image}
                    calories = {element.recipe.calories}
                    ingredients = {element.recipe.ingredientLines}/>
                    ))}
            </div>
            
        </div>
    )
}
export default Recipes;