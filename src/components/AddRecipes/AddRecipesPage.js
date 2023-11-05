import { motion } from "framer-motion";
import './AddRecipe.css';
import { useNavigate } from "react-router";
import {Button} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { TextField } from "@mui/material";
import {useState} from "react";
import DescriptionIcon from '@mui/icons-material/Description';
import {InputAdornment} from '@mui/material';
function AddRecipesPage () {
    const navigate = useNavigate();
    const [recipe,setRecipe] = useState({})
    const settings_properties = {fontSize:'1.5em',color:'#471824',transform:'scale(1.6)',width:'250px'};

    function handleRecipeProperties(event) {
        const {target } = event;
        setRecipe((prev) => 
        {
        return {
                ...prev,
                [target.name]: target.value
            }

        })
    }

    function goBack () {
        navigate(-1);
    }


    return (<motion.div
    initial={{ opacity: 0, transform:`scale(0.7)` }}
    animate={{ opacity: 1, transform:`scale(1)`}}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.9,type: "spring",bounce:0.5 }}

    ><div className="window-container">
    <div className="recipes-container">
        <div className="window-exit" style={{display:'flex',justifyContent:'space-between'}}>
<Button sx={{color:'#471824'}} onClick={goBack}><ArrowBack  sx={{fontSize:'6em',color:'#471824'}} /></Button>
        </div>

        <div className="form">


        <TextField
        id="input-with-icon-textfield"
        label="Recipe Name"
        name="name"
        onChange={handleRecipeProperties}
        sx={settings_properties}
        defaultValue={recipe.name}
        InputProps={{
        startAdornment: (
       <InputAdornment position="start">
        <DescriptionIcon />
        </InputAdornment>),}}
         variant="standard" />

        <TextField
        id="input-with-icon-textfield"
        label="Image Url"
        name="image"
        onChange={handleRecipeProperties}
        sx={settings_properties}
        defaultValue={recipe.name}
        InputProps={{
        startAdornment: (
       <InputAdornment position="start">
        <DescriptionIcon />
        </InputAdornment>),}}
         variant="standard" />

        <TextField
        id="input-with-icon-textfield"
        label="Instructions"
        name="instructions"
        onChange={handleRecipeProperties}
        sx={settings_properties}
        defaultValue={recipe.name}
        InputProps={{
        startAdornment: (
       <InputAdornment position="start">
        <DescriptionIcon />
        </InputAdornment>),}}
         variant="standard" />

        <TextField
        id="input-with-icon-textfield"
        label="Ingredients"
        name="ingredients"
        onChange={handleRecipeProperties}
        sx={settings_properties}
        defaultValue={recipe.name}
        InputProps={{
        startAdornment: (
       <InputAdornment position="start">
        <DescriptionIcon />
        </InputAdornment>),}}
         variant="standard" />

        
    </div></div></div></motion.div>)

}

export default AddRecipesPage;