import './App.css';
import {
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import Home from './Home';
import Recipes from './Recipes';
import PlanMenu from './PlanMenu';
import ShoppingList from './ShoppingList';
import apple from './app-store.png';
import google from './google.com (1).png'
import { useEffect, useState } from 'react';
import Contacts from './Contacts';
import dish from './dish.png'


function App() {
  const [myList, setMyList] = useState(
  localStorage.myList ? JSON.parse(localStorage.myList) : []);

  useEffect(() => {
  localStorage.setItem("myList", JSON.stringify(myList))
}, [myList]);

  return (
    <div className='main-cont'>
      <div>
        <div>
          <div className='cont-nav'>
            <img className='dish-img' src={dish} alt="dish" width="75px" />
          </div>
          <nav>
            <NavLink to="/" className='link'>Home</NavLink>
            <NavLink to="/recipes" className='link'>Recipes</NavLink>
            <NavLink to="/menu" className='link'>Plan menu</NavLink>
            <NavLink to="/shoppingList" className='link'>Shopping list <span className='count-items'>{myList.length}</span></NavLink>
          </nav>
        </div>
      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/recipes"element={<Recipes/>} />
          <Route path="/menu" element={<PlanMenu 
          setMyList={setMyList}
          myList={myList}/>} />
          <Route path="/shoppingList" element={<ShoppingList
          myList={myList}
          setMyList={setMyList}/>} />
          <Route path="/contact"element={<Contacts/>} />
        </Routes>
      </div>


      <div className='footer'>
        <p className='cont-footer'>Anna Filina 2023</p>
        <p className='cont-footer'>Download the app <img src={apple} alt="apple" width="30 px" /> <img src={google} alt="google" width="25px"/></p>
        <nav>
          <NavLink to="/contact" className='link'>Contacts</NavLink>
        </nav>
      </div>
    </div>
  );
}

export default App;
