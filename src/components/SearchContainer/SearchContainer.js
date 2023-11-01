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
import { grabFavorites } from '../RecipeMethods/RecipeMethods';
import SearchContainerPresentational from '../SearchContainerPresentation/SearchContainerPresentational';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const pagesConverter  = (items,numOfPages = 2) => {
    let pageIndex = 0;
    const pagesArray = [[]];
    if (!items.length) return [];
    items.forEach((item,index) => {
      if ((index+1) % numOfPages === 0) {
        pageIndex++
        pagesArray[pageIndex] = [];
      }   else {
        pagesArray[pageIndex].push(item)
      }
      
    })
    return  pagesArray;
}

function SearchContainer () {
    const [searchInput,setSearchInput] = useState('');
    const [recipesList,setRecipeList] = useState([]);
    const [favorited,setFavorited] = useState([])
    const [currentCategory,setCurrentCategory] = useState('all');
    const categories = [['breakfast',<BrunchDiningIcon sx={{fontSize:'5em'}} />],['lunch',<RestaurantIcon sx={{fontSize:'5em'}}  />],['dinner',<DinnerDiningIcon sx={{fontSize:'5em'}} />],['dessert',<IcecreamIcon sx={{fontSize:'5em'}}  />],['all',<LocalLibraryIcon sx={{fontSize:'5em'}}  />],['favorite',<FavoriteIcon sx={{fontSize:'4em', marginRight:'3px'}} />]];

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
            const isFavorited = favorited.find((r) => (r["name"] === recipe["name"]));
            return (
                <RecipeCard recipe={recipe} name={recipe.name} image={recipe.image} key={key} />
                )
            
        }
        return ''
    })
    },[currentCategory,searchInput])
    const AllCategories = useMemo(() => {
        return categories.map((category) => {
            let categoryf = switchCategory;
            let data = category[0];
            const defaultStyles = {borderColor:'#471824',margin:'10px',color:'#471824','&:hover': { backgroundColor: '#b78b6bfb'}};
            const variant = 'filled';
            const activeCategory = currentCategory === category[0];

            if (activeCategory) {
                defaultStyles.backgroundColor = '#471824';
                defaultStyles.color = 'white';
            }
            if (category[0] === 'favorite') {
                data = setFavorited;
                categoryf = (data) => {
                    switchCategory(category[0]);
                    grabFavorites(data);
                };
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