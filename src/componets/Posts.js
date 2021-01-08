import React, {useContext , useState} from 'react';
import {ContextProvider} from "../Global/Context";
import Comment from './Comments';
import './Posts.css';


const Posts = () => {
    const { posts } = useContext(ContextProvider);
    const [search, setsearch] = useState("")
    // defino como se va a filtrar la búqueda.
    // en éste caso pr el contenido del título.
    const filterPosts= posts.filter(post => {
      return post.title.toLowerCase().includes(search.toLowerCase())
    });

    

    return (
      <>
        <div>
          <div className="search__content">          
            <input type="text" className="navbar__search" placeholder="Search" onChange={e=>setsearch(e.target.value)} />
          </div>
          {/*acá mapeo todas las publicaciones con el fin de filtrar lo que el usario busca.*/}
        {filterPosts.map((post) => (
          <div className="posts" key={post.id}>
            <div className="posts__header">
              <div className="posts__header-avator">{post.username[0]}</div>
              <div className="posts__header-name">{post.username}</div>                            
            </div>
            <div className="posts__title">{post.title} </div>
            <div className="posts__img">
              <img src={post.image} alt={post.image} />
            </div>
            <Comment id={post.id} />
          </div>
        ))}
        </div>
      </>
    );
  };

  export default Posts;