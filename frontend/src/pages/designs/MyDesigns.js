// import useFetch from "../../hooks/useFetch";
// import { useParams, useHistory } from "react-router-dom";
import {useEffect, useState} from "react";
import DesignSquare from "../../components/DesignSquare/DesignSquare";

const MyDesigns = ({user}) => {
    console.log(user);

    const [designs, setDesigns] = useState([{
        name: '',
        imageUrl: '',
        description: '',
        specs: {
            length: '',
            width: '',
            height: '',

        },
        listingInfo: {
            cost: '',
        },
        creator: {
            name: '',
            id: '',
        }
    }]);

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/designs/mydesigns/'+user.id)
        .then(res => res.json())
        .then(data => {
            console.log('data', data);
            setDesigns(data);
            setIsPending(false);
        })
        .catch(err => {
            console.log(err);
            setError(err);
        });
    }, []);

    const allDesigns = designs.map(design => {
        console.log('inside map', design);
        return (
            <DesignSquare design={design}/>
        )
    });


    return ( 
        <div>
            <h1 className="title">{`${user.username}'s`} Designs</h1>
            <div className="body">
                <div className="browse">
                    {!isPending && allDesigns}
                    {isPending && <div className="loading">Loading...</div>}
                    {error && <div>{error}</div>}
                </div> 
            </div>
        </div>
     );
}
 
export default MyDesigns;