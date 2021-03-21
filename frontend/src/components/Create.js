import {useState} from "react";
import {useHistory} from "react-router-dom";
import {Redirect} from "react-router-dom";

const Create = ({user}) => {
    const history = useHistory();

    const [input, setInput] = useState({
        name: "",
        imageUrl: "",
        description: "",
        length: "",
        width: "",
        height: "",
        creator: ""
    });

    const [isPending, setIsPending] = useState(false);

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
            length: input.length,
            width: input.width,
            height: input.height,
            //creator: req.user,
        };

        console.log('new design (inputs from form)', newDesign);

        setIsPending(true);

        fetch('http://localhost:3037/api/create', {
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
            setIsPending(false);
            history.push('/details/'+jsonRes._id);
        })
        .catch(err => {
            console.log(err);
            setIsPending(false);
        });
    };

    return ( 
        <div>
            {!user && <Redirect to="/login"/>}
            {user && (
                <div>
                    <h2>Upload a new design</h2>
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

                        { }
                        { !isPending &&<button onClick={handleSubmit}>Submit Design</button> }
                        { isPending && <button disabled>Processing...</button> }
                    </form>
                </div>
            )}
        </div>
     );
}
 
export default Create;