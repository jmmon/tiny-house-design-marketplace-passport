import {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const CreateNote = () => {
    const history = useHistory();
    const [input, setInput] = useState({
        title: '',
        content: ''
    })

    const handleChange = (e) => {
        //console.log(e.target);
        const {name, value} = e.target;     //grab name and value properties of html input element

        setInput(prevInput => {     //set input element to (prevInput + newInput)
            return {
                ...prevInput,
                [name]: value           //set the "title" or "content" to this value
            };
        });
    };

    const handleClick = (e) => {
        //console.log(e.target);
        //console.log(input); //input object holding title and content
        e.preventDefault();

        const newNote = {
            title: input.title,
            content: input.content
        };

        axios.post('http://localhost:3001/create', newNote);
        
        history.push('/');
    }

    return ( 
        <div className="container">
            <h1>Create Note</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input onChange={handleChange} id="title" name="title" value={input.title} autoComplete="off" type="text" className="form-control" placeholder="The best note..."/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea onChange={handleChange} name="content" id="content" value={input.content} autoComplete="off" cols="30" rows="10" className="form-control" placeholder="Remember to wash behind your ears..."></textarea>
                </div>
                <button onClick={handleClick} className="btn btn-lg btn-info">Save Note</button>
            </form>
        </div>
     );
}
 
export default CreateNote;