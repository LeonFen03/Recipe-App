import './RecipeCard.css';
import {Card} from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { motion } from 'framer-motion';
function RecipeCard (props) {
    const serverURL =  'http://localhost:3002';
    const image = props.image ? serverURL+props.image : "https://placehold.co/310x400/000000/FFF";
    return ( <motion.div
        key={props.key}
        initial={{ opacity: 0, transform:`scale(0.9)` }}
        animate={{ opacity: 1, transform:`scale(1)`}}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.7,type: "spring" }}
        ><Card elevation={15} className="recipe-card">
        <div className="recipe-title">
           <h3 style={{fontSize:'1.4em'}}>{props.name}</h3>
           <h3>Recipe <FastfoodIcon size='large' /></h3>
        </div>
        <div className="recipe-image">
            <img src={image} />
        </div>
        
    </Card> </motion.div>)
}

export default RecipeCard;