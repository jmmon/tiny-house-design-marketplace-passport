import {Link} from "react-router-dom";

const Navbar = ({user}) => {
    console.log(user);
    return ( 
        <nav className="App-header">
            <Link to="/">
                <h1 className="title">Tiny House Design</h1>
            </Link>
            
            {user.username == null &&
            <ul>
                <li>Welcome, Guest!</li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>}
            
            {user.username!=null &&
            <ul>
                <li>Welcome, {user.username}!</li>
                <li><Link to="/create">Create New Design</Link></li>
                <li><Link to="/mydesigns">My Designs</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>}
        </nav>
     );
}
 
export default Navbar;