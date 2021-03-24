import {Link} from "react-router-dom";
import "./Navbar.css";

const Navbar = ({user}) => {
    console.log('navbar user console.log', user);
    return ( 
        <nav className="App-navbar">
            <Link to="/">
                <h1 className="title">Tiny House Design</h1>
            </Link>
            
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