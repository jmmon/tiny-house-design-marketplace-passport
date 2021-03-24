import useFetch from "../../hooks/useFetch";
import { useParams, useHistory, Link } from "react-router-dom";
import {useState} from "react";


const Details = () => {
    const { id } = useParams();

    const { data: design, isPending, error } = useFetch('/api/designs/details/'+id);
    const history = useHistory();
    console.log('fetched design', design);
    if (error) console.log('error', error);

    const [deleteConf, setDeleteConf] = useState(false);
    const [isCreator, setIsCreator] = useState(true);

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
                            <p>{design.imageUrl}</p>
                            <p>{design.description}</p>
                            <p>{design.specs.length}</p>
                            <p>{design.specs.width}</p>
                            <p>{design.specs.height}</p>
                            <p>{design.listingInfo.cost}</p>

                            {isCreator && !deleteConf && <button className="btn" onClick={confirmDelete}>Delete</button>}
                            {isCreator && deleteConf && <button className="btn" onClick={handleDelete}>Really Delete?</button>}
                            {isCreator && <Link to={`/edit/${id}`}><button className="btn">Edit</button></Link>}
                        </article>
                    </div>
                </div>
                
            )}
        </div>
     );
}
 
export default Details;