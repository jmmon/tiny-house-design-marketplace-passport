import {useState} from "react";
import {useHistory} from "react-router-dom";


const Register = ({user, setUser}) => {
    const history = useHistory();

    const [input, setInput] = useState({
        username: "",
        password: "",
        repeatPassword: ""
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

        const newUser = {
            username: input.username,
            password: input.password,
            repeatPassword: input.repeatPassword
        };

        console.log('new user', newUser);

        setIsPending(true);

        fetch('/api/users/register', {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log('new user posted', data.user);
            setIsPending(false);
            //setUser(data.user);
            user.username = data.user.username;
            user.id = data.user._id;
            setUser({...user, user});
            history.push('/');
        })
        .catch(err => {
            console.log(err);
            setIsPending(false);
        });
    };

    return ( 
        <div>
            <h1 className="title">Register a user</h1>
            <div className="body">
                <div className="register-form">
                    <form id="register-form">
                        <label htmlFor="username">Username</label>
                        <input onChange={handleChange} value={input.username} id="username" name="username" type="text" required minLength="5" />
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} value={input.password} id="password" name="password" type="password" required minLength="5" />
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input onChange={handleChange} value={input.repeatPassword} id="repeatPassword" name="repeatPassword" type="password" required minLength="5" />
                        { }
                        { !isPending &&<button onClick={handleSubmit}>Register</button> }
                        { isPending && <button disabled>Processing...</button> }
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Register;