import {useState} from "react";
import {useHistory, useParams, Link} from "react-router-dom";

const AddImages = ({design}) => {
    const { id } = useParams();     //design id
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(null);

    const handleUpload = async (event) => {
        event.preventDefault();
        setIsUploading(true);

        if (!file) {
            setTimeout(() => setError(''), 10000);
            return setError("Please choose a file");
        } else if (!file.name.match(/\.(jpeg|jpg|png)$/)){
            setTimeout(() => setError(''), 10000);
            return setError('Please upload an image file (jpeg, jpg, png)');
        }
        
        try {
            let data = new FormData();
            data.append(`file`, file);
            console.log('data', data);

            fetch(`/api/designs/details/${id}/upload`, {
                method: 'PUT',
                headers: {"Content-type": "multipart/form-data"},
                body: data
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.log('error with response', res)
                }
            })
            .then((jsonRes) => {
                setIsUploading(false);
                setTimeout(() => setUploadSuccess(null), 5000);
                setUploadSuccess(true);
                setFile(null);
                console.log('Upload successful, jsonRes', jsonRes);
                //history.push('/details/'+jsonRes._id);
            })
            .catch(err => {
                console.log(err);
                setIsUploading(false);
            });
        }
        catch (err) {
            console.log(err.response.data);
        }
    };

    return ( 
        <div>
            <h1 className="title">Upload Images</h1>
            <div className="body">
                <div className="create-form">
                    <form id="create-form">
                        {!uploadSuccess ? null : <div className="upload-success">Upload successful!</div>}

                        <label htmlFor="image">Image</label>
                        <input onChange={(e) => {
                            setFile(e.target.files[0])
                        }} id="image" name="image" type="file" />

                        { !isUploading &&<button onClick={handleUpload}>Upload</button> }
                        { isUploading && <button disabled>Processing...</button> }
                        {!error ? null : <div className="error-message">{error}</div>}
                    </form>
                    <Link to={`/details/${id}`}><button className="done">Done Uploading</button></Link>
                </div>
            </div>
        </div>
     );
}
 
export default AddImages;