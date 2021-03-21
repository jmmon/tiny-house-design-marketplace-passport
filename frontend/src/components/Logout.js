import {useEffect} from "react";
import {Redirect} from "react-router-dom";

const Logout = ({setUser}) => {

    useEffect(() => {
        setUser(null);
    })

    return ( 
        <Redirect to="/" />
    )
}
 
export default Logout;