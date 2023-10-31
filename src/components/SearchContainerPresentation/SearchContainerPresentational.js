import { TextField } from "@mui/material";
function SearchContainerPresentational (props) {
    const {
        availableRecipes:availableRecipes,
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
        <div className="category-container">
            {AllCategories}
        </div>
        
            {availableRecipes}
        </div>
    </div>
    </div>
</div>)

}

export default SearchContainerPresentational;