import useFetch from "../../hooks/useFetch";
import { useParams, useHistory, Link } from "react-router-dom";
import {useState} from "react";
import {CartContext} from "../../contexts/CartContext";
import {formatNumber} from "../../helpers/utils";
import {useContext} from "react";


const Details = ({user}) => {
    const { id } = useParams();

    const {addProduct, cartItems, increase} = useContext(CartContext);

    const isInCart = product => {
        // console.log('cartItems', cartItems);
        // console.log('Design/product', product);
        return !!cartItems.find(item => item._id === product._id);
    }

    const { data: design, isPending, error } = useFetch('/api/designs/details/'+id);
    const history = useHistory();
    console.log('fetched design', design);
    if (error) console.log('error', error);

    const [deleteConf, setDeleteConf] = useState(false);
    if (!isPending) {
        console.log('design creator',design.creator.username);
        console.log('user name',user.username);

    }

    const confirmDelete = () => {
        setDeleteConf(true);
    };
    
    const handleDelete = () => {

        fetch('/api/designs/details/' + id, {   //TODO
            method: "DELETE"
        })
        .then(res => {
            console.log('~res', res)
            if (res.ok) {
                return res.json();
            }
        })
        .then(data => {
            setDeleteConf(false);
            console.log('~data', data);
            history.push('/browse');
        })
    };

    return ( 
        <div>
            {/* {error && <div>{ error }</div>} */}
            {isPending && <div className="loading">Loading...</div>}
            {design && (
                

                <div>
                    <h1 className="title">Design Details - { design.name }</h1>
                    <div className="body">
                        <article className="browse-design ">
                            <h3>{design.name}</h3>
                            
                            <div className="container">
                                <img src={design.imageUrl} />
                                <ul>
                                    <li>{design.specs.length}</li>
                                    <li>{design.specs.width}</li>
                                    <li>{design.specs.height}</li>
                                </ul>
                            </div>

                            <div className="bottom">
                                <p className="creator">
                                    Designed by {design.creator.username} 
                                    {
                                        (design.creator.username === user.username) && 
                                        <Link to={`/edit/${id}`}>
                                            <button 
                                                className="btn edit"
                                            >Edit Product</button>
                                        </Link>
                                    }
                                    {
                                        (design.creator.username === user.username) && !deleteConf && <button 
                                            className="btn delete" 
                                            onClick={confirmDelete}
                                        >Remove Product</button>
                                    }
                                    {
                                        (design.creator.username === user.username) && deleteConf && 
                                        <button 
                                            className="btn delete-confirm" 
                                            onClick={handleDelete}
                                        >Confirm Delete</button>
                                    }
                                </p>
                                <p>{formatNumber(design.listingInfo.cost)}</p>
                                <p>{design.description}</p>
                                
                                

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
                        </article>
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default Details;



/* <div className="browse-design">
                    <h2>{design.name}</h2>
                    <div className="container">
                        <img src={design.imageUrl} alt={design.name}/>
                        <ul>
                            <li>Length: {design.specs.length}</li>
                            <li>Width: {design.specs.width}</li>
                            <li>Height: {design.specs.height}</li>
                        </ul>
                    </div>
                    <div className="bottom">
                        <p>Designed by {design.creator.username}</p>
                        <p>{formatNumber(design.listingInfo.cost)}</p>
                        <p>{design.description}</p>
                        <Link className="details" to={`/details/${design._id}`}><button className="btn">Details</button></Link>

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
                </div> */