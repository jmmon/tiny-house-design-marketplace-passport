import useFetch from "./hooks/useFetch";
import { useParams, useHistory, Link, Redirect } from "react-router-dom";
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

    useEffect(() => {
        fetch('/api/designs/details/'+id)
        .then(res => {
            if (res.ok) {
                console.log('initial response', res);
                return res.json();
            } else {
                let e = Error('Error from fetch', res);
                setError(e);
                throw e;
            }
        })
        .then(resJson => {
            console.log('resJson', resJson);
            setDesign(resJson);
            return;
        })
        .then(()=>{
            setInput({
                name: design.name,
                imageUrl: design.imageUrl,
                description: design.description,
                specs: {
                    length: design.specs.length,
                    width: design.specs.width,
                    height: design.specs.height,
                },
                listingInfo: {
                    cost: design.listingInfo.cost,
                },
                creator: {
                    name: '',
                    id: '',
                }
            });
            setIsPending(false);
            console.log('fetched design', design);
        })
        .catch(e => console.log(e));
    }, [])

    

    

    // const [input, setInput] = useState({
    //     name: design[0].name,
    //     imageUrl: design[0].imageUrl,
    //     description: design[0].description,
    //     specs: {
    //         length: Number(design[0].length),
    //         width: Number(design[0].width),
    //         height: Number(design[0].height),
    //     },
    //     listingInfo: {
    //         cost: Number(design[0].cost),
    //     },
    //     creator: {
    //         name: '',
    //         id: '',
    //     }
    // });

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
                length: Number(input.length),
                width: Number(input.width),
                height: Number(input.height),

            },
            listingInfo: {
                cost: Number(input.cost),
            },
            //creator: req.user,
        };

        console.log('new design (inputs from form)', newDesign);

        setIsSubmitting(true);

        fetch('/api/designs/create', {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(newDesign)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
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
            {!user.username && <Redirect to="/login"/>}
            {user.username && isPending && <div>Loading ...</div>}
            {error && <div>Error: {error}</div>}
            {user.username && !isPending && (
                <div>
                    <h2>Edit Design</h2>
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
            )}
        </div>
     );
}
 
export default Edit;