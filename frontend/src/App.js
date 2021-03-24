import './App.css';
import {useContext, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import Welcome from './pages/Static/Welcome';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import About from './pages/Static/About';
import Contact from './pages/Static/Contact';
import Browse from './pages/designs/Browse';
import Details from './pages/designs/Details';
import Create from './pages/designs/Create';
import Logout from './pages/user/Logout';
import MyDesigns from './pages/designs/MyDesigns';
import Edit from './pages/designs/Edit';
import Cart from './pages/user/cart/Cart';


function App() {
    // const context = useContext(AppContext)
    const [user, setUser] = useState({
        username: null,
        id: null
    });

    return (
        <div className="App">
            <Router>
                <Navbar user={user}/>
                <Sidebar user={user} />
                <div className="App-Content">
                    <Switch>
                        <Route exact path="/">
                            <Welcome />
                        </Route>
                        <Route path="/login">
                            <Login user={user} setUser={setUser}/>
                        </Route>
                        <Route path="/register">
                            <Register user={user} setUser={setUser}/>
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/browse">
                            <Browse />
                        </Route>
                        <Route path="/create">
                            <Create user={user}/>
                        </Route>
                        <Route path="/details/:id">
                            <Details />
                        </Route>
                        <Route path="/logout">
                            <Logout user={user} setUser={setUser}/>
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
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
