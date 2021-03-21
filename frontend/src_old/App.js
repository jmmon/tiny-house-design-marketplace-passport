import {} from 'react-router-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';

function App() {

    //navbar
    //home
    //notes
    //create note
    return (
        <div>
            <Router>
                <Navbar />
                
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path="/notes">
                    <Notes />
                </Route>

                <Route path="/create">
                    <CreateNote />
                </Route>

            </Router>
        </div>
    );
}

export default App;
