import React, {useEffect, useState} from "react";


const Notes = () => {
    const [notes, setNotes] = useState([{
        title: '',
        content: ''
    }]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/notes")
        .then(res => {
            if (res.ok) {
                return res.json()
            }
        })
        .then(jsonRes => {
            console.log('jsonRes', jsonRes)
            setNotes(jsonRes)
            setIsPending(false);
        })
        .catch(err => {
            console.log(err);
            setError(err);
        });
    }, []);

    return ( 
        <div className="container">
            <h1>Notes</h1>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {notes && notes.map(note => (
                <div>
                    <h1>{note.title}</h1>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
     );
}
 
export default Notes;