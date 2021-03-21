import {Link} from "react-router-dom";

const Sidebar = () => {
    return ( 
        <aside className="App-sidebar">
            <h3><Link to="/browse">Browse</Link></h3>
            <form className="searchbar">
                <input className="searchbox" type="text" />
            </form>
            <h4><Link to="/about">About</Link></h4>
            <h4><Link to="/contact">Contact</Link></h4>
        </aside>
     );
}
 
export default Sidebar;