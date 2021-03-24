import { Link } from "react-router-dom";

const DesignSquare = ({design}) => {
    return ( 
        <Link className="browse-design" to={`/details/${design._id}`}>
            <h2>{design.name}</h2>
            <p>Designed by {design.creator.name}</p>
            <img src={design.imageUrl} />
            <ul>
                <li>Length: {design.specs.length}</li>
                <li>Width: {design.specs.width}</li>
                <li>Height: {design.specs.height}</li>
            </ul>
            <p>{design.listingInfo.cost}</p>
            <p>{design.description}</p>
        </Link>
        
     );
}
 
export default DesignSquare;
