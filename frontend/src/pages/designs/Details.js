import useFetch from "../../hooks/useFetch";
import { useParams, useHistory, Link } from "react-router-dom";
import {useState} from "react";


const Details = ({user}) => {
    const { id } = useParams();

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
                        <article className="design-details">
                            <h3>{design.name}</h3>
                            <h4>Designed by {design.creator.username}</h4>
                            <img src={design.imageUrl} />
                            <p>{design.description}</p>
                            <p>{design.specs.length}</p>
                            <p>{design.specs.width}</p>
                            <p>{design.specs.height}</p>
                            <p>{design.listingInfo.cost}</p>

                            {
                                (design.creator.username === user.username) && !deleteConf && <button 
                                    className="btn" 
                                    onClick={confirmDelete}
                                >Remove Product From Shelf</button>
                            }
                            {
                                (design.creator.username === user.username) && deleteConf && 
                                <button 
                                    className="btn" 
                                    onClick={handleDelete}
                                >Permanently Delete Product Info?</button>
                            }
                            {
                                (design.creator.username === user.username) && 
                                <Link to={`/edit/${id}`}>
                                    <button 
                                        className="btn"
                                    >Edit Product</button>
                                </Link>
                            }
                        </article>
                    </div>
                </div>
                
            )}
        </div>
     );
}
 
export default Details;