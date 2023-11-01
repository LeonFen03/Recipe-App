 import {serverURL } from '../Root/Root';
 
  export const grabFavorites = async (returnFavorites) => {
    try {
      const favoriteRecipe = await fetch(serverURL+'/recipes/favorites/');
      const results = (await favoriteRecipe.json());
    returnFavorites(results);
    } catch (err) {
    }

  

  }
  export const deleteFavorites = async (id,returnFavorites) => {
    try {
     const deletedRecipe = await fetch(serverURL+`/recipes/favorites/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch((err) => {
        console.log('errors')
      })
      const deletedRecipeJSON = await deletedRecipe.json();
      grabFavorites(returnFavorites);
    } catch (err) {

    }
  }
  
  

  export const AddToFavorites = async (object,returnFavorite) => {
    try {
      const favoriteRecipes = await fetch(serverURL+'/recipes/favorites/save', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify(object)
    })
    .catch((err) => {
  
    })
    returnFavorite((await favoriteRecipes.json()))
    } catch (err) {
      console.log(err)
    }
    
  }
  