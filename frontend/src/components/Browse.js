import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const Browse = () => {
    const [designs, setDesigns] = useState([{
        name: '',
        imageUrl: '',
        description: '',
        length: '',
        width: '',
        height: '',
    }]);

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/browse")
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
            <div class="browse-design">
                <h3>{design.name}</h3>
                <h4>{design.creator}</h4>
                <img src={design.imageUrl} />
                <ul>
                    <li>{design.length}</li>
                    <li>{design.width}</li>
                    <li>{design.height}</li>
                </ul>
                <p>{design.description}</p>
                <Link className="btn" to={`/details/${design._id}`}>Details</Link>
            </div>
        )
    })

    return ( 
        <div className="container">
            <h1>Browse Designs</h1>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {designs && allDesigns}
        </div>
     );
}
 
export default Browse;