import { motion } from "framer-motion";
import './AddRecipe.css';
import { useNavigate } from "react-router";
import {Button} from "@mui/material";
function AddRecipesPage () {
    const navigate = useNavigate();

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


        
    </div></div></div></motion.div>)

}

export default AddRecipesPage;