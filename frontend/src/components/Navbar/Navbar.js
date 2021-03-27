import {Link} from "react-router-dom";
import "./Navbar.css";
import MenuIcon from "../../images/baseline_menu_black_18dp.png";
import CloseIcon from "../../images/baseline_close_black_18dp.png";

const Navbar = ({user, sidebarExpanded, toggleSidebar}) => {
    
    //console.log('navbar user console.log', user);
    return ( 
        <nav className="App-navbar">
        <div className="left">
            {
                !sidebarExpanded && <button className="sidebar" onClick={toggleSidebar}><img src={MenuIcon} /></button>
            }
            {
                sidebarExpanded && <button className="sidebar" onClick={toggleSidebar}><img src={CloseIcon} /></button>
            }
            
            <Link to="/">
                <h1 className="title">Tiny House Design</h1>
            </Link>
        </div>
            
            
            {user.username == null &&
            <ul>
                <li><Link to="/browse">Welcome, Guest!</Link></li>
                <li><Link to="/cart">Cart</Link></li>
            </ul>}
            
            {user.username!=null &&
            <ul>
                <li><Link to="/mydesigns">Welcome, {user.username}!</Link></li>
                <li><Link to="/cart">Cart</Link></li>
            </ul>}
        </nav>
     );
}
 
export default Navbar;