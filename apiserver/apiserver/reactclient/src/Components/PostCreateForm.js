import React, {useState} from "react";
const API_BASE_URL_DEVELOPMENT = 'https://localhost:7008';
const ENDPOINTS = {
    GET_ALL_POSTS: 'get-all-posts',
    GET_POSTS_BY_ID: 'get-post-by-id',
    CREATE_POST: 'create-post',
    UPDATE_POST: 'update-post',
    DELETE_POST_BY_ID: 'delete-post-by-id'
};

const URLS = {
    API_URL_GET_ALL_POSTS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_ALL_POSTS}`,
    API_URL_GET_POSTS_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_POSTS_BY_ID}`,
    API_URL_CREATE_POSTS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CREATE_POST}`,
    API_URL_UPDATE_POSTS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_POST}`,
    API_URL_DELETE_POSTS_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_POST_BY_ID}`,

}

const initialFormData = Object.freeze({
    title: "Post x",
    content: "This is post x, it may be changed later"
});

export default function PostCreateForm(props) {
    const [formData, setFormData] = useState(initialFormData);



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postToCreate = {
            postId: 0,
            title: formData.title,
            content: formData.content

        }
        const url = URLS.API_URL_CREATE_POSTS;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(postToCreate)
          })
          .then(response => response.json())
          .then(responseFromServer => {
            console.log(responseFromServer);
          })
          .catch((error) => {
           console.log(error);
           alert(error); 
          });
          props.onPostCreated(postToCreate);
    };

return (
    <div>
        <form className="w-100 px-5">
            <h1 className="mt-5">Create new Post</h1>

            <div className="mt-5">
                <label className="h3 form-label"> Post title</label>
                <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange}/>

            </div>
            <div className="mt-4">
                <label className="h3 form-label"> Post content</label>
                <input value={formData.content} name="content" type="text" className="form-control" onChange={handleChange}/>
                
            </div>
            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={() =>props.onPostCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    </div>
)

}