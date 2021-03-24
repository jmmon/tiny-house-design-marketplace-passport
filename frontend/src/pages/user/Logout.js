import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

const Logout = ({user, setUser}) => {
    const history = useHistory();

    const [isPending, setIsPending] = useState(true);
    // const [error, setError] = useState(null);


    useEffect(() => {
        fetch("/api/users/logout")      //works
        .then(res => {                  
            if (res.ok) {               //if res = ok then user is logged out
                console.log('res', res);
                console.log('Logging out');
                user.username = null;
                user.id = null;
                setUser({...user, user});
                setIsPending(false);
                history.push('/');
                return res.json();
            } else {
                console.log('~server res', res)
            }
        })
        // .then(data => {
            
        // })
        .catch(err => {
            console.log(err);
            setIsPending(false);
            // setError('There was an error logging out.');
        });
    }, []);

    return ( 
        <div>
            {isPending && <div className="loading">Logging out...</div>}
            {/* {error && <div>Error: {error}</div>}
            {!isPending && !error && <Redirect to="/" />} */}
        </div>
    )
}
 
export default Logout;