import { Outlet } from "react-router";
import { Button } from "@mui/material";
import { useEffect } from "react";
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
              <li>
                <Button style={{borderRadius:'10px',backgroundColor:'rgba(138,89,78,255)'}} variant="contained" onClick={(e) => navigate('/Favorites')}>Login</Button>
              </li>
          </ul>
          </nav>
      <Outlet />
   </div>)
  }

export const serverURL = 'http://localhost:3002';

export default Root;