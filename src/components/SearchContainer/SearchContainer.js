import './SearchContainer.css';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import titleImage from '../images/title.png';



function SearchContainer () {
    const [recipesList,setRecipeList] = useState([]);
    const [searchInput,setSearchInput] = useState('');
    function handleSearch (e) {
        setSearchInput(e.target.value)
    }
    function RetreiveRecipes () {
        fetch('http://localhost:3002/recipes')
        .then((resolved) => {
            return resolved.json();
        })
        .then((recipes) => {   
            if (!recipesList.Error) {
                setRecipeList(recipes);
            } else {
                setRecipeList([]); 
            }
            return recipes;
        })
    


    }
    useEffect(() => {
        RetreiveRecipes();
    },[])


    return (<div className="body">
        <div>
        <div className="search-results">
        <div className="image-box">
            <img src={titleImage} />
        </div>
        <div className="results">
            <div className="search-bar">
                <div>
                <TextField
                style={{width:'500px',transform:'scale(1.6)',backgroundColor:'white'}}
                id="outlined-required"
                label="Dish"
                placeholder='Spaghetti'
                onChange={handleSearch}
                />
                </div>
            </div>
            <div className="category-container">
            </div>
 
            </div>
        </div>
        </div>
    </div>)
}   
export default SearchContainer;