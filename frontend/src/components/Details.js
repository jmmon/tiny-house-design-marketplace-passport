import useFetch from "./hooks/useFetch";
import { useParams, useHistory } from "react-router-dom";

const Details = () => {
    const { id } = useParams();

    const { data: design, isPending, error } = useFetch('/api/designs/details/'+id);
    const history = useHistory();
    console.log('fetched design', design);

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
            console.log('~data', data);
            history.push('/browse');
        })
    };

    return ( 
        <div className="container">
            {design && <h1>Design Details - { design[0].name }</h1>}
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            {design && (
                <article className="design-details">
                    <h3>{design[0].name}</h3>
                    <h4>Designed by {design[0].creator.name}</h4>
                    <p>{design[0].imageUrl}</p>
                    <p>{design[0].description}</p>
                    <p>{design[0].specs.length}</p>
                    <p>{design[0].specs.width}</p>
                    <p>{design[0].specs.height}</p>
                    <p>{design[0].listingInfo.cost}</p>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default Details;