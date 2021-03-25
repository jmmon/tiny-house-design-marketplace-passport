import { Link } from "react-router-dom";
import "./DesignSquare.css";
import {CartContext} from "../../contexts/CartContext";
import {formatNumber} from "../../helpers/utils";
import {useContext} from "react";

const DesignSquare = ({design}) => {

    const {addProduct, cartItems, increase} = useContext(CartContext);

    const isInCart = product => {
        // console.log('cartItems', cartItems);
        // console.log('Design/product', product);
        return !!cartItems.find(item => item._id === product._id);
    }

    return ( 
        <div className="browse-design">
            <h2>{design.name}</h2>
            <p>Designed by {design.creator.username}</p>
            <img src={design.imageUrl} alt={design.name}/>
            <ul>
                <li>Length: {design.specs.length}</li>
                <li>Width: {design.specs.width}</li>
                <li>Height: {design.specs.height}</li>
            </ul>
            <p>{formatNumber(design.listingInfo.cost)}</p>
            <p>{design.description}</p>
            <Link className="btn details" to={`/details/${design._id}`}>Details</Link>

            {
                isInCart(design) &&
                <button
                onClick={() => increase(design)}
                className="btn btn-outline-primary btn-sm">Add more</button>
            }

            {
                !isInCart(design) &&
                <button
                onClick={() => addProduct(design)}
                className="btn btn-primary btn-sm">Add to cart</button>
            }

        </div>
     );
}
 
export default DesignSquare;
