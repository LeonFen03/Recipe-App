import './Recipes.css'
import { useEffect,useState } from 'react';
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
function Recipes () {
    const [recipe,setRecipe] = useState({})
    const [editBoolean,setEditBoolean] = useState(false);
    const [name,setName] = useState('');
    const [instructions,setInstructions] = useState('');
    const [ingredients,setIngredients] = useState([])
    const navigate = useNavigate();
    const {id} = useParams();
    const settings_properties = {fontSize:'1.5em',color:'#471824',transform:'scale(1.6)',width:'250px'};

    function editToggle () {
        setEditBoolean(!editBoolean);
    }

    function goBack () {
        navigate(-1);
    }
    function handleName (e) {
        setName(e.target.value)
    }
    function handleInstructions (e) {
        setInstructions(e.target.value)
    }
    function handleIngredients (e) {
        setIngredients(e.target.value)
    }



    function saveRecipe () {

    }
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
            <div className="window-exit" style={{display:'flex',justifyContent:'space-between'}}>
                    <Button sx={{color:'#471824'}} onClick={goBack}><ArrowBack  sx={{fontSize:'6em',color:'#471824'}} /></Button>
                    <Button  onClick={editToggle} sx={{color:'#471824',fontSize:'1.4em'}}>Edit <Edit sx={{fontSize:'2em',color:'#471824'}} /></Button>
                </div>
            <div className="image-container">
                 <img src={serverURL+recipe.image} />
            </div>
            <div className="recipes-information-container ">
                <div className="text-container setting-divider">
                <p>Name:</p>
                    {editBoolean ?  <TextField
                                    id="input-with-icon-textfield"
                                    label="Recipe Name"
                                    onClick={handleName}
                                    sx={settings_properties}
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
                                    onClick={handleInstructions}
                                    sx={settings_properties}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <DescriptionIcon />
                                        </InputAdornment>),}}
                                    variant="standard" /> : <p><b>{recipe.instructions}</b></p>}
                </div>
                <div className="text-container setting-divider">
                <p>Ingredients:</p> 
                    
                   {editBoolean ? <TextField
                                    id="input-with-icon-textfield"
                                    label="Recipe Ingredients"
                                    onClick={handleIngredients}
                                    sx={settings_properties}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <DescriptionIcon />
                                        </InputAdornment>),}}
                                    variant="standard" />  : (recipe.ingredients.length ? <p><b>{recipe['ingredients']}</b></p> : <p>No Ingredients Listed</p>)}

                </div>
                <div className="setting-divider">
                {editBoolean ?
                     <Button sx={{fontSize:'2em',color:'#471824'}}>Save</Button> : ''}
                </div>
                </div>
        </div>
    </div></motion.div>)
    } else {
        // navigate(-1);
    }
}

export default Recipes;