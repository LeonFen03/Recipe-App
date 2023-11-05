//requirements
import { useState } from "react";
import { useEffect } from "react";
import AddRecipeDialog from './AddRecipeDialog';
import { addRecipe } from "../RecipeMethods/RecipeMethods";

//function to add a recipe to the database 
function AddRecipe ({ setRecipeList }) {
    //establishing state variables for new recipe
    const [image,setImage] = useState('')
    const [name,setName] = useState('')
    const [instructions,setInstructions] = useState('')
    const [ingredients,setIngredients] = useState([])
    const [category,setCategory] = useState('')
    
    
    useEffect(() => {
        console.log(category);
    },[category])

//function takes user input adding recipe to database
    function handleSubmit () {
        addRecipe({
            image:image,
            name:name,
            instructions:instructions,
            ingredients:ingredients,
            category:category
        },setRecipeList)
    }
    function handleImage (image) {
        setImage(image);
    }
    function imageUrl(e) {
        setImage(e.target.value)
        console.log(image)
    }
    function handleName (e) {
        setName(e.target.value);
    }
    function handleInstructions (e) {
        setInstructions(e.target.value);
    }
    function handleIngredients (e) {
        setIngredients(e.target.value);
    }
    function handleCategory (string) {
        setCategory(string);

    }

    return (<AddRecipeDialog imageUrl={imageUrl} name={name} handleSubmit={handleSubmit} handleImage={handleImage} handleName={handleName} handleInstructions={handleInstructions} handleIngredients={handleIngredients} handleCategory={handleCategory} text={'Add Recipe'} />)
    
}
export default AddRecipe;