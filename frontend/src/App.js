import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Navbar from './components/parts/Navbar';
import Footer from './components/parts/Footer';
import Sidebar from './components/parts/Sidebar';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import Browse from './components/Browse';
import Details from './components/Details';
import Create from './components/Create';
import {useState} from "react";
import Logout from './components/Logout';
import MyDesigns from './components/MyDesigns';
import Edit from './components/Edit';

function App() {
    const [user, setUser] = useState({
        username: null,
        id: null
    });

    return (
        <div className="App">
            <Router>
                <Navbar user={user}/>
                <Sidebar />
                <div className="Content">
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
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
