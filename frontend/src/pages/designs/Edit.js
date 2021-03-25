// import useFetch from "../../hooks/useFetch";
import { useParams, useHistory, Link } from "react-router-dom";
import {useState, useEffect} from "react";


const Edit = ({user}) => {
    const { id } = useParams();
    const history = useHistory();

    //const { data: design, isPending, error } = useFetch('/api/designs/details/'+id);
    const [design, setDesign] = useState({});
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [input, setInput] = useState({});
    
    console.log(user);

    useEffect(() => {
        if (!user.username) {
            history.push('/login');
        } else {
            fetch('/api/designs/details/'+id)
            .then(res => {
                if (res.ok) {
                    console.log('initial response', res);
                    return res.json();
                } else {
                    throw Error('Error from fetch', res);
                }
            })
            .then(resJson => {
                setDesign(resJson);
                console.log('resJson', resJson);
                setInput({
                    name: resJson.name,
                    imageUrl: resJson.imageUrl,
                    description: resJson.description,
                    
                        length: resJson.specs.length,
                        width: resJson.specs.width,
                        height: resJson.specs.height,
                    
                        cost: resJson.listingInfo.cost,
                    
                    creator: {
                        name: user.username,
                        id: user.id,
                    }
                });
                setIsPending(false);
                if (user.username !== resJson.creator.username){
                    history.push("/details/"+design._id);
                }
                console.log('fetched design', design);
            })
            .catch(e => console.log(e));
        }
    }, []);


    const handleChange = (event) => {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newDesign = {
            name: input.name,
            imageUrl: input.imageUrl,
            description: input.description,
            specs: {
                length: input.length,
                width: input.width,
                height: input.height,

            },
            listingInfo: {
                cost: input.cost,
            },
            //creator: req.user,
        };

        console.log('new design (inputs from form)', newDesign);

        setIsSubmitting(true);

        fetch('/api/designs/edit/'+id, {
            method: 'PUT',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(newDesign)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                let e = Error('Error from fetch', res);
                setError(e);
                throw e;
            }
        })
        .then((jsonRes) => {
            console.log('new design posted', jsonRes);
            setIsSubmitting(false);
            history.push('/details/'+jsonRes._id);
        })
        .catch(err => {
            console.log(err);
            setIsSubmitting(false);
        });
    };

    return ( 
        <div>
            {user.username && isPending && <div className="loading">Loading ...</div>}
            {/* {(user.username != design.creator.username) && !isPending && <Redirect to={"/details/"+design._id} />} */}
            {error && <div>Error: {error}</div>}
            {user.username && !isPending && (
                <div>
                    <h1 className="title">Edit Design</h1>
                    <div className="body">
                        <div className="edit-form">
                            <form id="create-form">
                                <label htmlFor="name">Name</label>
                                <input onChange={handleChange} value={input.name} id="name" name="name" type="text" required minLength="5" />

                                <label htmlFor="imageUrl">ImageUrl of Design</label>
                                <input onChange={handleChange} value={input.imageUrl} id="imageUrl" name="imageUrl" type="text" required />

                                <label htmlFor="description">Description</label>
                                <textarea onChange={handleChange} id="description" name="description" required>{input.description}</textarea>

                                <label htmlFor="length">Length of Trailer</label>
                                <input onChange={handleChange} value={input.length} id="length" name="length" type="number" min="0" required />

                                <label htmlFor="width">Width at Widest Point</label>
                                <input onChange={handleChange} value={input.width} id="width" name="width" type="number" min="0" required />

                                <label htmlFor="height">Height at Tallest Point</label>
                                <input onChange={handleChange} value={input.height} id="height" name="height" type="number" min="0" required />

                                <label htmlFor="cost">Cost</label>
                                <input onChange={handleChange} value={input.cost} id="cost" name="cost" type="number" min="0" required />

                                
                                { !isSubmitting && <button onClick={handleSubmit}>Save Edit</button> }
                                { isSubmitting && <button disabled>Processing...</button> }
                                <Link to={"/details/"+design._id}><button>Cancel</button></Link>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default Edit;