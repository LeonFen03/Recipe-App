import './SearchContainer.css';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import RecipeCard from '../Recipe-Card/RecipeCard';
import titleImage from '../images/title.png';
import IcecreamIcon from '@mui/icons-material/Icecream';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { useMemo } from 'react';
import SearchContainerPresentational from '../SearchContainerPresentation/SearchContainerPresentational';
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
        // .catch((err) => {
        //     setRecipeList(mockData)
        // })
    
    }
    useEffect(() => {
        RetreiveRecipes();
    },[])
    function handleSearch (e) {
        setSearchInput(e.target.value)
    }
    const availableRecipes = useMemo(() => {
       return recipesList.map((recipe,key) => {
        if ( (recipe.name.includes(searchInput) && (recipe.category === currentCategory || currentCategory === 'all'))) {
            return (
                <RecipeCard recipe={recipe} name={recipe.name} image={recipe.image} key={key} />
                )
            
        }
        return ''
    })
    },[currentCategory,searchInput])
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


    const searchProperties = {
        availableRecipes:availableRecipes,
        AllCategories:AllCategories,
        titleImage:titleImage,
        handleSearch:handleSearch,

    }
    return (<SearchContainerPresentational {...searchProperties} />)
}   
export default SearchContainer;