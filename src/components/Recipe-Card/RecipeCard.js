import './RecipeCard.css';
import {Card} from '@mui/material';
function RecipeCard (props) {
    const serverURL =  'http://localhost:3002';
    const image = serverURL+props.image;
    return ( <Card className="recipe-card">
        <div className="recipe-title">
           <h3 style={{fontSize:'1.4em'}}>{props.name}</h3>
        </div>
        <div className="recipe-image">
            <img src={image} />
        </div>
        
    </Card>)
}

export default RecipeCard;