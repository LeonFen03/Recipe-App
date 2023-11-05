//requirements
import './App.css';
import Recipes from './components/Recipes/Recipes';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Root from './components/Root/Root';
import Home from './components/Home/Home';
import AddRecipesPage from './components/AddRecipes/AddRecipesPage';

export const pagesConverter  = (items,numOfPages = 2) => {
  let pageIndex = 0;
  const pagesArray = [[]];
  if (!items.length) return [];
  items.forEach((item,index) => {
    if ((index+1) % numOfPages === 0) {
      pageIndex++
      pagesArray[pageIndex] = [];
    }   else {
      pagesArray[pageIndex].push(item)
    }
    
  })
  return  pagesArray;
}

//returns the main webpage
function App() {
  const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root />}> 
    <Route path="Home" element={<Home />} />
    <Route path="recipes" element={<Recipes />} >
      <Route path="add"  element={<AddRecipesPage />} >
      </Route>
      <Route path=":id" />
    </Route>
    <Route path="add" element={<AddRecipesPage />} />
    </Route>))

  return (
    <AnimatePresence >
  <RouterProvider router={appRouter} />
  </AnimatePresence>);
}

export default App;
