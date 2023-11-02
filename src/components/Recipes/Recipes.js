import './Recipes.css'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router';
import { serverURL } from '../Root/Root';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack } from '@mui/icons-material';
function Recipes () {
    const [recipe,setRecipe] = useState({})
    const {id} = useParams();
    const checkForIngredients = recipe.hasOwnProperty('ingredients') ? recipe['ingredients'].length : '';
    async function Recipe () {
        const recipe = await fetch(serverURL+`/recipes/${id}`);
        const recipeJSON = await recipe.json();
        setRecipe(recipeJSON['recipes']);
    }
    useEffect(() => {
        Recipe();
    })
    if (recipe.hasOwnProperty('_id')) {
        return (<motion.div
            initial={{ opacity: 0, transform:`scale(0.7)` }}
            animate={{ opacity: 1, transform:`scale(1)`}}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.9,type: "spring",bounce:0.5 }}
    
            ><div className="window-container">
        <div className="recipes-container">
            <div className="window-exit">
                    <Button><ArrowBack  sx={{fontSize:'6em',color:'#471824'}} /></Button>
                </div>
            <div className="image-container">
                 <img src={serverURL+recipe.image} />
            </div>
            <div className="recipes-information-container">
                <div className="text-container">
                    <span>Name: <b>{recipe.name}</b></span>
                </div>
                <br />
                <div className="text-container">
                    <span>Instructions:</span>
                    <p><b>{recipe.instructions}</b></p>
                </div>
                <div className="text-container">
                    {recipe.ingredients.length ?  <span>Ingredients:</span> : ''}
                   {recipe.ingredients.length ? <p><b>{recipe['ingredients']}</b></p> : ''}

                </div>
                
            </div>
        </div>
    </div></motion.div>)
    } else {
        // navigate(-1);
    }
}

export default Recipes;