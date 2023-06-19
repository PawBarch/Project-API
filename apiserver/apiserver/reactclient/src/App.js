import React, { useState } from "react";
import PostCreateForm from "./Components/PostCreateForm";
import PostUpdateForm from "./Components/PostUpdateForm";
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
export default function App() {
  const [posts, setPosts] = useState([]);
  const[showingCreateNewPostForm, setshowShowingCreateNewPostForm] = useState(false);
  const[postCurrentlyBeingUpdated, setpostCurrentlyBeingUpdated] = useState(null);

  function getPosts() {
    const url = URLS.API_URL_GET_ALL_POSTS;

    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(postsFromServer => {
      console.log(postsFromServer);
      setPosts(postsFromServer);
    })
    .catch((error) => {
     console.log(error);
     alert(error); 
    });
  }
  function deletePost(postId) {
    const url =`${URLS.API_URL_DELETE_POSTS_BY_ID}/${postId}`;

    fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      onPostDeleted(postId);
    })
    .catch((error) => {
     console.log(error);
     alert(error); 
    });
  }
  return (
    <div className="container">
      <div className="row min vh-100">
            <div className="col d-flex flex-column justify-content-center align-content-center"> 
            {(showingCreateNewPostForm === false && postCurrentlyBeingUpdated=== null)  && (
                          <div>
                          <h1>Minimalistyczne API</h1>
                            <div className="mt-5">
                              <button onClick={getPosts}   className="btn btn-dark btn-lg w-100">Get</button>
                              <button onClick={()=>setshowShowingCreateNewPostForm(true)}   className="btn btn-secondary btn-lg w-100 mt-4">Create</button>             
                            </div>
                            </div>
            )}


            
            {(posts.length > 0 && showingCreateNewPostForm === false && postCurrentlyBeingUpdated=== null) && renderPostsTable()}

            {showingCreateNewPostForm && <PostCreateForm onPostCreated ={onPostCreated}/>}
            {postCurrentlyBeingUpdated !== null  && <PostUpdateForm post={postCurrentlyBeingUpdated} onPostUpdated={onPostUpdated}/>}
            </div>
      </div>

    </div>
  );


  function renderPostsTable() {  
      return (
        <div className="table-responsive mt-5">
          <table className="table table-bordered border-dark">
            <thead>
              <tr>
                <th scope="col">PostId (PK)</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">CRUD Operations</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button onClick={() => setpostCurrentlyBeingUpdated(post)} className="btn btn-dark btn-lg mx-3 my-3">Update</button>
                  <button onClick={() => {if(window.confirm(`Are you certain?`)) deletePost(post.postId) }} className="btn btn-secondary btn-lg">Delete</button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setPosts([])} className="btn btn-dark btn-lg w-100">
            Clear
          </button>
        </div>
      )
    
  }
  function onPostCreated(createdPost) {
    setshowShowingCreateNewPostForm(false);
    if (createdPost === null)
    {
      return;
    }

    alert(`Post created`);
    getPosts();
  }
  function onPostUpdated(updatedPost) {
    setpostCurrentlyBeingUpdated(null);
    if (updatedPost === null)
    {
      return;
    }
    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) =>
    {
      if (postsCopyPost.postId === updatedPost.postId)
      {
        return true;
      }
    });
    if (index !== -1) {
      postsCopy[index] = updatedPost;
    }
    setPosts(postsCopy);

    alert(`Post updated`);
  }
  function onPostDeleted(deletedPostPostId) {
    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.postId === deletedPostPostId)
      {
        return true;
      }
    });
    if (index !== -1) {
      postsCopy.splice(index, 1);
    }
    setPosts(postsCopy);

    alert(`Post deleted`);

  }
  }
  

    






