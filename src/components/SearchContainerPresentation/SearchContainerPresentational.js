import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import {ButtonGroup} from "@mui/material";
function SearchContainerPresentational (props) {
    const {
        availableRecipes:availableRecipes,
        pageIndex:pageIndex,
        turnPage:turnPage,
        setRecipeList:setRecipeList,
        seedData:seedData,
        clearData:clearData,
        AllCategories:AllCategories,
        titleImage:titleImage,
        handleSearch:handleSearch,
    } = props;


    return (<div className="body">
    <div>
    <div className="search-results">
    <div className="image-box">
        <img src={titleImage} />
    </div>
    <div className="results">
        <div className="search-bar">
            <div>
            <TextField
            style={{width:'500px',transform:'scale(1.6)',backgroundColor:'white'}}
            id="outlined-required"
            label="Dish"
            placeholder='Spaghetti'
            onChange={handleSearch}
            />
            </div>
        </div>
        <div className="admin-bar"> 
                <ButtonGroup>
                    <Button  style={{backgroundColor:'#471824' }} onClick={seedData} variant="contained">Seed recipes</Button>
                    <Button  style={{backgroundColor:'#471824'}} onClick={clearData} variant="contained">Clear Recipes</Button>
                </ButtonGroup>
                </div>
        <div className="category-container">
            {AllCategories}
        </div>
        
            {availableRecipes[pageIndex]}
            <div className="button-bar">
            {availableRecipes.map((_,i) => {
                i = i+1;
                return (<div className="button">
                        <Button   sx={{fontSize:'2em',backgroundColor: (i-1) === pageIndex ? '#471824' : '#b78b6bfb','&:hover': { backgroundColor: '#b78b6bfb'}}} onClick={() => turnPage(i-1)} variant="contained">{i}</Button>
                    </div>)
            })}
            </div>
        </div>
    </div>
    </div>
</div>)

}

export default SearchContainerPresentational;