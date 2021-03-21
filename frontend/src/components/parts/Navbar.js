import {Link} from "react-router-dom";

const Navbar = ({user}) => {
    return ( 
        <nav className="App-header">
            <Link to="/">
                <h1 className="title">Tiny House Design</h1>
            </Link>
            
            {!user &&
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>}
            
            {user &&
            <ul>
                <li><Link to="/create">Create New Design</Link></li>
                <li><Link to="/myDesigns">My Designs</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>}
        </nav>
     );
}
 
export default Navbar;