import './App.css';
import {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import Welcome from './pages/static/Welcome';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import About from './pages/static/About';
import Contact from './pages/static/Contact';
import Browse from './pages/designs/Browse';
import Details from './pages/designs/Details';
import Create from './pages/designs/Create';
import Logout from './pages/user/Logout';
import MyDesigns from './pages/designs/MyDesigns';
import Edit from './pages/designs/Edit';
import Cart from './pages/user/cart/Cart';


function App() {
    const [user, setUser] = useState({
        username: null,
        id: null
    });
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const toggleSidebar = () => {
        setSidebarExpanded(!sidebarExpanded);
    }

    return (
        <div className="App">
            <Router>
                <Navbar user={user} sidebarExpanded={sidebarExpanded} toggleSidebar={toggleSidebar}/>
                <Sidebar user={user} sidebarExpanded={sidebarExpanded} />
                <div className="App-Content">
                    <Switch>
                        <Route path="/login">
                            <Login user={user} setUser={setUser}/>
                        </Route>
                        <Route path="/register">
                            <Register user={user} setUser={setUser}/>
                        </Route>
                        <Route path="/logout">
                            <Logout user={user} setUser={setUser}/>
                         </Route>
                        <Route path="/about">
                            <About user={user} />
                        </Route>
                        <Route path="/contact">
                            <Contact user={user} />
                        </Route>
                        <Route path="/browse">
                            <Browse user={user} />
                        </Route>
                        <Route path="/create">
                            <Create user={user}/>
                        </Route>
                        <Route path="/details/:id">
                            <Details user={user} />
                        </Route>
                         <Route path="/myDesigns">
                             <MyDesigns user={user}/>
                         </Route>
                        <Route path="/edit/:id">
                            <Edit user={user} />
                        </Route>
                        <Route path="/cart">
                            <Cart user={user}/>
                        </Route>
                        <Route exact path="/">
                            <Welcome user={user} />
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
