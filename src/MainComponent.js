import {
    Routes,
    Route,
    NavLink
} from "react-router-dom";
import apple from './Image/app-store.png';
import google from './Image/google.com (1).png';
import { useEffect, useRef, useState } from 'react';
import Contacts from './Contacts';
import dish from './Image/dish.png'
import { Badge } from 'react-bootstrap';
import close from './Image/close.png';
import menu from './Image/menu.png';
import Login from './login';
import Logout from './logout';
import { useAuth0 } from '@auth0/auth0-react';
import Home from "./HomeComponents/Home";
import Recipes from "./RecipesComponents/Recipes";
import PlanMenu from "./MenuComponents/PlanMenu";
import PlanMenuAuth from "./MenuComponents/PlanMenuAuth";
import { getAllUserWeek } from "./MenuComponents/FetchWeek";
import ShoppingListAuth from "./ShippingListComponents/ShoppingListAuth";
import ShoppingList from "./ShippingListComponents/ShoppingList";

function MainComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth0();
    const [userWeek, setUserWeek] = useState([]);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [myList, setMyList] = useState(
    localStorage.myList ? JSON.parse(localStorage.myList) : []);
    const numberOfLiElementsPerWeek = userWeek.map(week => {
        return week.days.flatMap(day => day.ingredients.split(',')).filter(ingredient => ingredient.trim() !== '').length;
    });
    const totalLiElements = numberOfLiElementsPerWeek.reduce((total, count) => total + count, 0) - 1;
    useEffect(() => {
        localStorage.setItem("myList", JSON.stringify(myList))
    }, [myList]);

    const [isScrolled, setIsScrolled] = useState(false);
    const scrollRef = useRef();
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        scrollRef.current = handleScroll;
        window.addEventListener('scroll', scrollRef.current);
        return () => {
            window.removeEventListener('scroll', scrollRef.current);
        };
    }, []);
    const { user } = useAuth0();
    const userId = user && user.sub ? user.sub.split('|').pop() : '';
    useEffect(() => {
        getAllUserWeek(userId, setUserWeek)
    }, [userId, setUserWeek]);
    return (
        <div className='main-cont'>
            <div>
                <div>
                    <button className={`hamburger mobile-only`} onClick={toggleMenu}>
                        <img
                            src={isMenuOpen ? close : menu}
                            alt="menu-icon"
                            width="30px"
                        />
                    </button>
                    <div className='cont-nav'>
                        <img className={`dish-imgr ${isScrolled ? 'hidden-img' : ''}`} src={dish} alt="dish" width="70px" />
                    </div>
                    <nav className={`my-navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'open' : ''}`}>
                        <NavLink to="/" className='link'>Home</NavLink>
                        <NavLink to="/recipes" className='link'>Recipes</NavLink>
                        <NavLink to="/menu" className='link'>Plan menu</NavLink>
                        <NavLink to="/shoppingList" className='link'>Shopping list <Badge className='count-items' bg="secondary">{isAuthenticated ? totalLiElements : myList.length}</Badge></NavLink>
                    </nav>
                    <Login isScrolled={isScrolled} />
                    <Logout isScrolled={isScrolled} />
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipes"element={<Recipes/>} />
                    <Route path="/menu" element={isAuthenticated ? <PlanMenuAuth userWeek={userWeek} setUserWeek={setUserWeek} userId={userId}/> : <PlanMenu 
                        setMyList={setMyList}
                        myList={myList}/>} />
                    <Route path="/shoppingList" element={isAuthenticated ? <ShoppingListAuth userWeek={userWeek} /> : <ShoppingList
                        myList={myList}
                        setMyList={setMyList}/>} />
                    <Route path="/contact"element={<Contacts/>} />
                </Routes>
            </div>
            <div className='footer'>
                <p className='cont-footer'>Anna Filina 2023</p>
                <p className='cont-footer'>Download the app <img className='appImgApple' src={apple} alt="apple" width="30 px" /> <img className='appImgGoogle' src={google} alt="google" width="25px"/></p>
                <nav>
                    <NavLink to="/contact" className='link contact-link'>Contacts</NavLink>
                </nav>
            </div>
        </div>
    );
}

export default MainComponent;