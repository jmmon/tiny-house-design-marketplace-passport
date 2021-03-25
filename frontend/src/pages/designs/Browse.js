import React, {useEffect, useState} from "react";
import DesignSquare from "../../components/DesignSquare/DesignSquare";

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
        // console.log('inside map', design);
        return (
            <DesignSquare key={design._id} design={design}/>
        )
    })

    return ( 
        <div>
            <h1 className="title">Browse Designs</h1>
            <div className="body">
                <div className="browse">
                    {!isPending && allDesigns}
                    {isPending && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    {!isPending && allDesigns.length===0 && <div>No products to show!</div>}
                    {/* {allProducts}
                    {allProducts.length===0 && <div>No products to show!</div>} */}
                    
                </div>
            </div>
        </div>
     );
}
 
export default Browse;