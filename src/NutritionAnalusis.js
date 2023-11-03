import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import search from './Image/search-1.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function NutritionAnalysis() {
    const [myNutrition, setMyNutrition] = useState();
    const [mySearch, setMySearch] = useState("");
    const [wordSubmitted, setWordSubmitted] = useState("100 g avocado");

    const myIngredientSearch = (e) => {
        setMySearch(e.target.value);
    }
    const finalSearch = (e) => {
        e.preventDefault();
        setWordSubmitted(mySearch);
    }
    const getData = async(ingredient) => {
        const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=773d9493&app_key=3c0a2d374f41dd7a43272c2798ea81ae`, {
            method: "POST",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingr: ingredient })
        })
        if (response.ok) {
            const myData = await response.json();
            setMyNutrition(myData);
        } else {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingredient not found!',
            })
        }
    }
    
    useEffect(() => {
        if (wordSubmitted !== "") {
            let ingredient = wordSubmitted.split(/[,,;,\n,\r]/);
            getData(ingredient);
        }
    }, [wordSubmitted])


    return(
        <div>
            <div className='center'>
                <h1 className="cont-plan-meny">Analyze your nutrition</h1>
            </div>
            <div className="container-nutrition">
                <div className='container-input-nutrition'>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">✦ Example: "100 g chicken".</Tooltip>}>
                        <span className="d-inline-block">
                            <form onSubmit={finalSearch}>
                                <input className="input-nutrition" onChange={myIngredientSearch} type="text" placeholder='Enter ingredient and qantity...' />
                            </form>
                        </span>
                    </OverlayTrigger>
                    <button className='btn-search' onClick={finalSearch}><img src={search} alt="search" width="50px" /></button>
                </div>
                <div className="container-nutrition-result">
                    <div className="position-nutrition-result">
                        <h4 className="center">{wordSubmitted}</h4>
                    {myNutrition && Object.values(myNutrition.totalNutrients).map(({label, quantity, unit}, index) => (
                        <div key = {index} className='center'>
                            <p className="text-nutrition"><b>{label}</b> - {quantity.toFixed(1)} {unit}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>

    )

}
export default NutritionAnalysis;