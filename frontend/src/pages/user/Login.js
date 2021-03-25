import {useState} from "react";
import {useHistory, Link} from "react-router-dom";

const Login = ({user, setUser}) => {
    const history = useHistory();

    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const [isPending, setIsPending] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const userCredentials = {
            username: input.username,
            password: input.password,
        };

        console.log('userCredentials', userCredentials);

        setIsPending(true);

        fetch('/api/users/login', {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(userCredentials)
        })
        .then(res => res.json())
        .then(data => {
            console.log('data', data);
            console.log('logged in as', data.user);
            setIsPending(false);
            user.username = data.user.username;
            user.id = data.user._id;
            console.log('user state', user);
            setUser({...user, user});
            //setUser(data.user);
            history.push('/');
        })
        .catch(err => {
            console.log(err);
            setIsPending(false);
        });
    };
    //add comment for testing heroku
    return ( 
        <div>
            <h1 className="title">Login To Your Account</h1>
            <div className="body">
                <div className="login-form">
                    <form id="login-form">
                        <div>
                            <label htmlFor="username">Username</label>
                            <input onChange={handleChange} value={input.username} id="username" name="username" type="text" />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input onChange={handleChange} value={input.password} id="password" name="password" type="password" />
                        </div>
                        <div className="buttons">
                            { !isPending &&<button onClick={handleSubmit}>Login</button> }
                            { isPending && <button disabled>Processing...</button> }
                        </div>
                        <div className="login-text">Need to register?</div>
                        <div className="buttons">
                            <Link to="/register">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Login;