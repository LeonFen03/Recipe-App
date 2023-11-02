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
import { AddToFavorites } from '../RecipeMethods/RecipeMethods';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { serverURL } from '../Root/Root';

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
    const [recipesList,setRecipeList] = useState({mockUp:false, recipes:null});
    const [favorited,setFavorited] = useState([])
    const [pageIndex,setPageIndex] = useState(0);
    const [currentCategory,setCurrentCategory] = useState('all');
    const categories = [['breakfast',<BrunchDiningIcon sx={{fontSize:'5em'}} />],['lunch',<RestaurantIcon sx={{fontSize:'5em'}}  />],['dinner',<DinnerDiningIcon sx={{fontSize:'5em'}} />],['dessert',<IcecreamIcon sx={{fontSize:'5em'}}  />],['all',<LocalLibraryIcon sx={{fontSize:'5em'}}  />],['favorite',<FavoriteIcon sx={{fontSize:'4em', marginRight:'3px'}} />]];

    function switchCategory (category) {
        setCurrentCategory(category);
        turnPage(0);
    }
    function turnPage (i) {
        setPageIndex(i);
    }
    function RetreiveRecipes () {
        fetch(serverURL+'/recipes')
        .then((resolved) => {
            return resolved.json();
        })
        .then((recipes) => {   
            if (!recipesList.Error) {
                setRecipeList({ mockUp:false, recipes:recipes});
            } else {
                setRecipeList({mockUp:false, recipes:null}); 
            }
            return recipes;
        })
        .catch((err) => {
            
         })
    
    }
    useEffect(() => {
        RetreiveRecipes();
    },[])
    function handleSearch (e) {
        setSearchInput(e.target.value)
    }
    async function clearData () {
        const seedData = await fetch(serverURL+'/recipes/clear');
        const seedJSON = await seedData.json();
        setRecipeList({ mockUp:false, recipes:[]})
     
    }

    async function seedData () {
        const seedData = await fetch(serverURL+'/recipes/seeds');
        const seedJSON = await seedData.json();
        setRecipeList({ mockUp:false, recipes:seedJSON})
     
        
     }

    const availableRecipes = useMemo(() => {
        let extractRecipes = recipesList['recipes'];
        if (currentCategory === 'favorite') {
            extractRecipes = favorited;
        }   
        // If recipes loaded else deliver an empty array
        if (!(extractRecipes === null) && (extractRecipes.length)) {
            extractRecipes = extractRecipes.map((recipe,key) => {
                    const recipeName = recipe.name.toLowerCase();
                    const inputName = searchInput.toLowerCase();
                    if ( ((recipeName.includes(inputName) && (recipe.category === currentCategory)) || currentCategory === 'all' || currentCategory === 'favorite')) {
                        const isFavorited = favorited.find((r) => (r["name"] === recipe["name"]));

                        const RecipeCardProperties = {

                            favoritedStatus:favorited,
                            refreshRecipes:setRecipeList,
                            addFavorite:AddToFavorites,
                            setFavorite:setFavorited,
                            mockUp:recipesList.mockUp,
                            recipe:recipe,
                            image:recipe.image,
                            key:key,
                            isFavorited:isFavorited ? true : false,
                        }
                        return (
                            <RecipeCard {...RecipeCardProperties} />
                            )
                    } 
                
                return '';
            }).filter((i) => i !== '')
            extractRecipes = pagesConverter(extractRecipes,5).filter((page) => page.length);
        } else {
            extractRecipes = [];
        }
        return !extractRecipes.length ? [[<h1>No Results</h1>]] : extractRecipes;
    },[currentCategory,searchInput,favorited,recipesList])

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
                 <Button onClick={(e) => categoryf(data)}  sx={defaultStyles} variant={variant} size="large">
                {category[1]}
                <p>{category[0]}</p>
                </Button>
                </div>)
        })
    },[categories,recipesList])


    const searchProperties = {
        availableRecipes:availableRecipes,
        pageIndex:pageIndex,
        turnPage:turnPage,
        setRecipeList:setRecipeList,
        seedData:seedData,
        clearData:clearData,
        AllCategories:AllCategories,
        titleImage:titleImage,
        handleSearch:handleSearch,

    }
    return (<SearchContainerPresentational {...searchProperties} />)
}   
export default SearchContainer;