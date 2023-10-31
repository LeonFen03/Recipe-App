import './SearchContainer.css';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import titleImage from '../images/title.png';
import IcecreamIcon from '@mui/icons-material/Icecream';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { useMemo } from 'react';
import Button from '@mui/material/Button';
function SearchContainer () {
    const [searchInput,setSearchInput] = useState('');
    const [recipesList,setRecipeList] = useState([]);
    const [currentCategory,setCurrentCategory] = useState('all');
    const categories = [['breakfast',<BrunchDiningIcon sx={{fontSize:'5em'}} />],['lunch',<RestaurantIcon sx={{fontSize:'5em'}}  />],['dinner',<DinnerDiningIcon sx={{fontSize:'5em'}} />],['dessert',<IcecreamIcon sx={{fontSize:'5em'}}  />],['all',<LocalLibraryIcon sx={{fontSize:'5em'}}  />]];

    function switchCategory (category) {
        setCurrentCategory(category);
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
    function handleSearch (e) {
        setSearchInput(e.target.value)
    }
    const AllCategories = useMemo(() => {
        return categories.map((category) => {
            const defaultStyles = {borderColor:'#471824',margin:'10px',color:'#471824'};
            const variant = 'filled';
            const activeCategory = currentCategory === category[0];
            if (activeCategory) {
                defaultStyles.backgroundColor = '#471824';
                defaultStyles.color = 'white';
            }
            return (<div >
                 <Button onClick={(e) => switchCategory(category[0])}  sx={defaultStyles} variant={variant} size="large">
                {category[1]}
                <p>{category[0]}</p>
                </Button>
                </div>)
        })
    },[categories])


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
                {AllCategories}
            </div>
 
            </div>
        </div>
        </div>
    </div>)
}   
export default SearchContainer;