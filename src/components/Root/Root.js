import { Outlet } from "react-router";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import './Root.css';

function Root () {
    const navigate = useNavigate()
    // useEffect(() => {
    //   navigate('/Home')
    // },[])
   return (<div>
       <nav className="navigation">
          <ul>
              <li>
                 <Button style={{borderRadius:'10px',backgroundColor:'rgba(138,89,78,255)'}} variant="contained" onClick={(e) => navigate('/Home')}>Home</Button>
              </li>
          </ul>
          </nav>
      <Outlet />
   </div>)
  }

export const serverURL = 'http://recipe-backend-3ec90697f7a1.herokuapp.com/';


export const formatImage =  (imageURL) => {
    const imageUrlFormat = new RegExp('https:*')
    const imageServerFormat = new RegExp('/images/*')
    let recipe_image_properties = {transform:'scale(0.38)'};
  
    let formattedImage = imageURL;
    if (imageUrlFormat.test(formattedImage)) {
         formattedImage = imageURL;
         recipe_image_properties = {transform:'scale(0.38)'}
     }  else if (imageServerFormat.test(formattedImage)) {
         formattedImage = serverURL+imageURL;
         recipe_image_properties = {transform:'scale(0.29)'}
     } else if (!formattedImage) {
         formattedImage = "https://placehold.co/310x400/000000/FFF";
     } 
  
     return [formattedImage,recipe_image_properties];
  }
  
export default Root;