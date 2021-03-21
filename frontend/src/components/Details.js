import useFetch from "./hooks/useFetch";
import { useParams, useHistory } from "react-router-dom";

const Details = () => {
    const { id } = useParams();

    const { data: design, isPending, error } = useFetch('/api/details/'+id);
    const history = useHistory();
    console.log('fetched design', design);

    const handleDelete = () => {
        fetch('/api/details/' + id, {   //TODO
            method: "DELETE"
        })
        .then(() => {
            history.push('/browse');
        })
    };

    return ( 
        <div className="container">
            {design && <h1>Design Details - { design[0].name }</h1>}
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            {design && (
                <article class="design-details">
                    <h3>{design[0].name}</h3>
                    <h4>{design[0].creator}</h4>
                    <p>{design[0].imageUrl}</p>
                    <p>{design[0].description}</p>
                    <p>{design[0].length}</p>
                    <p>{design[0].width}</p>
                    <p>{design[0].height}</p>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default Details;