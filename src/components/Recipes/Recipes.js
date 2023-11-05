import './Recipes.css'
import { useCallback, useEffect,useState } from 'react';
import { useParams } from 'react-router';
import { serverURL } from '../Root/Root';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { Edit } from '@mui/icons-material';
import { TextField } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import {InputAdornment} from '@mui/material';
import { UpdateRecipe } from '../RecipeMethods/RecipeMethods';
import { useMemo } from 'react';
import { formatImage } from '../Root/Root';
function Recipes () {
    const [recipe,setRecipe] = useState({})
    const [editBoolean,setEditBoolean] = useState(false);
    const [name,setName] = useState(recipe.name);
    const [instructions,setInstructions] = useState(recipe.instructions);
    const [ingredients,setIngredients] = useState(recipe.ingredients)
    const navigate = useNavigate();
    const {id} = useParams();
    const settings_properties = {fontSize:'1.5em',color:'#471824',transform:'scale(1.6)',width:'250px'};
    const [image,properties] = useMemo(() => {
        if (recipe['image']) {
            return formatImage(recipe['image'])
        } else {
            return ['','']
        }
        
        
    },[recipe])
    function editToggle () {
        setEditBoolean(!editBoolean);
    }

    function goBack () {
        navigate(-1);
    } 
    function handleName (e) {
        setName(e.target.value);
    }
    function handleInstructions (e) {
        setInstructions(e.target.value)
    }
    function handleIngredients (e) {
        const ingredients = e.target.value.split('/');
        setIngredients(!ingredients.length ? e.target.value : ingredients)
    }
    function newline (ingredient) {
        return (<p>{ingredient}</p>)
    }


    const saveRecipe = useCallback( async () => {
        UpdateRecipe(id,{
            name:name,
            instructions:instructions,
            ingredients:ingredients
        },setRecipe)
        setEditBoolean(false)
    },[name,instructions,ingredients,id])

    async function Recipe () {
        const recipe = await fetch(serverURL+`/recipes/${id}`);
        const recipeJSON = await recipe.json();
        setRecipe(recipeJSON['recipes']);
    }

    useEffect(() => {
        Recipe();
    },[recipe])
    
    if (recipe.hasOwnProperty('_id')) {
        return (<motion.div
            initial={{ opacity: 0, transform:`scale(0.7)` }}
            animate={{ opacity: 1, transform:`scale(1)`}}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.9,type: "spring",bounce:0.5 }}
    
            ><div className="window-container">
        <div className="recipes-container">
            <div className="window-exit" style={{display:'flex',justifyContent:'space-between'}}>
                    <Button sx={{color:'#471824'}} onClick={goBack}><ArrowBack  sx={{fontSize:'6em',color:'#471824'}} /></Button>
                    <Button  onClick={editToggle} sx={{color:'#471824',fontSize:'1.4em'}}>Edit <Edit sx={{fontSize:'2em',color:'#471824'}} /></Button>
                </div>
            <div className="image-container">
                 <img src={image} alt={recipe.name} />
            </div>
            <div className="recipes-information-container ">
                <div className="text-container setting-divider">
                <p>Name:</p>
                    {editBoolean ?  <TextField
                                    id="input-with-icon-textfield"
                                    label="Recipe Name"
                                    onChange={handleName}
                                    sx={settings_properties}
                                    defaultValue={recipe.name}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <DescriptionIcon />
                                        </InputAdornment>),}}
                                    variant="standard" /> : <span><b>{recipe.name}</b></span> }
                </div>
                <br />
                <div className="text-container setting-divider">
                    <p>Instructions:</p>
                    {editBoolean ? <TextField
                                    id="input-with-icon-textfield"
                                    label="Recipe Instructions"
                                    onChange={handleInstructions}
                                    defaultValue={recipe.instructions}
                                    sx={settings_properties}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <DescriptionIcon />
                                        </InputAdornment>),}}
                                    variant="standard" /> : <p><b>{recipe.instructions}</b></p>}
                </div>
                <div className="text-container setting-divider">
                <p>Ingredients {editBoolean ?  <span>(newline '/')</span> : ''}:</p> 
                    
                   {editBoolean ? <TextField
                                    id="input-with-icon-textfield"
                                    label="Recipe Ingredients"
                                    onChange={handleIngredients}
                                    defaultValue={'None'}
                                    sx={settings_properties}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <DescriptionIcon />
                                        </InputAdornment>),}}
                                    variant="standard" />  : (recipe.ingredients.length ? <p><b>{recipe['ingredients'].map(newline)}</b></p> : <p>No Ingredients Listed</p>)}

                </div>
                <div className="setting-divider">
                {editBoolean ?
                     <Button onClick={saveRecipe} sx={{fontSize:'2em',color:'#471824'}}>Save</Button> : ''}
                </div>
                </div>
        </div>
    </div></motion.div>)
    } else {
       return (<div style={{display:'flex',justifyContent:'center',alignItems:'center'}} className="recipes-container"> 
        <h2>No recipe found please try again </h2>
        </div>)
    }
}

export default Recipes;