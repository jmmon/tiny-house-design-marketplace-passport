import {Link} from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({user}) => {
    return ( 
        <aside className="App-sidebar">
            <h3><Link to="/browse">Browse</Link></h3>
            <form className="searchbar">
                <input className="searchbox" type="text" />
            </form>
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                {user.username && <li><Link to="/create">Create New Design</Link></li>}{user.username && <li><Link to="/mydesigns">Edit</Link></li>}
                {user.username && <li><Link to="/logout">Logout</Link></li>}
                {!user.username && <li><Link to="/login">Login</Link></li>}
                {!user.username && <li><Link to="/register">Register</Link></li>}
                
            </ul>
        </aside>
     );
}
 
export default Sidebar;