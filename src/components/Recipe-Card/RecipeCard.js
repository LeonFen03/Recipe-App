import './RecipeCard.css';
import {Card} from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button} from '@mui/material';
import { serverURL } from '../Root/Root';
import { deleteFavorites } from '../RecipeMethods/RecipeMethods';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
function RecipeCard (props) {
    const server =  !props.mockUp ? serverURL : '';
    const {favoritedStatus} = props;
    const {isFavorited} = props;
    const [favoriteToggle,setFavoriteToggle] = useState(isFavorited);
    const image = props.image ? server+props.image : "https://placehold.co/310x400/000000/FFF";

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

    return ( <motion.div
        key={props.key}
        initial={{ opacity: 0, transform:`scale(0.7)` }}
        animate={{ opacity: 1, transform:`scale(1)`}}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.9,type: "spring",bounce:0.5 }}

        ><Card elevation={15} className="recipe-card">
        <div className="recipe-title">
           <h3 style={{fontSize:'1.4em'}}>{props.recipe.name}</h3>
           <Link style={{color:'#471824'}} to={'/recipes/'+props.recipe["_id"]}><h3>Recipe <FastfoodIcon size='large' /></h3></Link>

           <div className="favorited-bar">
           {favoriteToggle ? <Button onClick={(e) => handleToggle(props.recipe)}> <FavoriteIcon sx={{color:'red',fontSize:'3em'}} /></Button> : <Button  onClick={(e) => handleToggle(props.recipe)}><FavoriteBorderIcon sx={{color:'red',fontSize:'3em'}} /></Button>}
            </div>
        </div>
        <div className="recipe-image">
            <img src={image} />
        </div>
        
    </Card> </motion.div>)
}

export default RecipeCard;