import './Header.css';
import title from '../images/dragonbites.png'
import dragonIcon from '../images/dragonicon.png';
function Header () {
    return (<div className="herosection-image-container">
        <div className="title">
            <div className="title-bg">
                <img src={title} />
                <img className="dragon" src={dragonIcon}  />
            </div>
        </div>
</div>)
}
export default Header;