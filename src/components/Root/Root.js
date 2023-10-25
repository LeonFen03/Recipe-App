import { Outlet } from "react-router";
import './Root.css';

function Root () {
 return (<div>
    <nav className="navigation">
        <ul>
            <li>

            </li>
        </ul>
    </nav>
    <Outlet />
 </div>)
}
export default Root;