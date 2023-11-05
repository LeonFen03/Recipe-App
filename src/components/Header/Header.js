//requirements
import './Header.css';
import title from '../images/dragonbites.png'
import dragonIcon from '../images/dragonicon.png';

//returns the header element
function Header () {
    return (<div className="herosection-image-container">
        <div className="title">
            <div className="title-bg">
                <img src={title} alt={`Dragon Bites`} />
                <img className="dragon" src={dragonIcon} alt='dragon icon' />
            </div>
        </div>
</div>)
}
export default Header;