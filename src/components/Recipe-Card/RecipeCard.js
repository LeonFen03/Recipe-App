import './RecipeCard.css';
import {Card} from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button} from '@mui/material';
import { deleteFavorites } from '../RecipeMethods/RecipeMethods';
import { Link } from 'react-router-dom';
import { deleteRecipe } from '../RecipeMethods/RecipeMethods';
import CloseIcon from '@mui/icons-material/Close';
import { formatImage } from '../Root/Root';
function RecipeCard (props) {
    const {favoritedStatus} = props;
    const {isFavorited} = props;
    const [favoriteToggle,setFavoriteToggle] = useState(isFavorited);
    let [image,recipe_image_properties] = formatImage(props.image);


    useEffect(() => {
        if (isFavorited) {
            setFavoriteToggle(favoritedStatus);
        }
    },[favoritedStatus]);

    function handleToggle (recipes) {
        if (favoriteToggle) {
            const id = recipes["_id"] ? recipes["_id"] : recipes["id"];
            deleteFavorites(id,props.setFavorite);
        } else {
            props.addFavorite(recipes);
        }
        setFavoriteToggle((prev) => !prev);
    }

    function removeRecipes() {
        const {refreshRecipes} = props;
        const { recipe } = props;
        deleteRecipe(recipe["_id"],refreshRecipes);
    }

    return ( <motion.div
        key={props.key}
        initial={{ opacity: 0, transform:`scale(0.7)` }}
        animate={{ opacity: 1, transform:`scale(1)`}}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.9,type: "spring",bounce:0.5 }}

        ><Card elevation={15} className="recipe-card">
        <div className="recipe-title">
        <span className="exit-btn"><Button  sx={{backgroundColor:'#471824','&:hover': { backgroundColor: '#7e573cfb'}}} variant="contained" onClick={removeRecipes}><CloseIcon /></Button></span>
           <h3 style={{fontSize:'1.4em'}}>{props.recipe.name}</h3>
           <Link style={{color:'#471824'}} to={'/recipes/'+props.recipe["_id"]}><h3>Recipe <FastfoodIcon size='large' /></h3></Link>

           <div className="favorited-bar">
           {favoriteToggle ? <Button onClick={(e) => handleToggle(props.recipe)}> <FavoriteIcon sx={{color:'red',fontSize:'3em'}} /></Button> : <Button  onClick={(e) => handleToggle(props.recipe)}><FavoriteBorderIcon sx={{color:'red',fontSize:'3em'}} /></Button>}
            </div>
        </div>
        <div style={recipe_image_properties} className="recipe-image">
            <img src={image} />
        </div>
        
    </Card> </motion.div>)
}

export default RecipeCard;