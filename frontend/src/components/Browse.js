import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import DesignSquare from "./parts/DesignSquare";

const Browse = () => {
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
        fetch("/api/designs/browse")
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(jsonRes => {
            console.log('jsonRes', jsonRes);
            setDesigns(jsonRes);
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
    })

    return ( 
        <div className="container">
            <h1>Browse Designs</h1>
            {!isPending && allDesigns}
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!isPending && allDesigns.length==0 && <div>No products to show!</div>}
        </div>
     );
}
 
export default Browse;