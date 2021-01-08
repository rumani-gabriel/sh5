import React from 'react';
import {ContextProvider} from '../Global/Context';
import {db} from "../Config";
import './Comments.css';

const Comments = (props) => {
    const { loader, user, publishComment } = React.useContext(ContextProvider);
    const [state, setState] = React.useState("");
    const [comments, setComments] = React.useState([]);
    const postComment = (e) => {
      e.preventDefault();
      publishComment({ id: props.id, comment: state });
      setState("");
    };
    React.useEffect(() => {
      db.collection("posts")
        .doc(props.id)
        .collection("comments")
        .orderBy("currentTime", "desc")
        .onSnapshot((snp) => {
          setComments(snp.docs.map((doc) => doc.data()));
        });
    }, []);
    return (
      
      <div className="comments">
        
        <div className="comments__section">
          {!loader && user ? (
            <div>
            {comments.map((comment) => (
              <div className="comments__container" key={comment.id}>
                <div className="comments__container-name"><strong>{comment.username}</strong></div>
                <div className="comments__container-msg">{comment.comment}</div>
              </div>
            ))}
            <form onSubmit={postComment}>
              <input
                type="text"
                className="comment__input"
                placeholder="Add a comment.."
                onChange={(e) => setState(e.target.value)}
                value={state}
                required
              />
            </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };
  
  export default Comments;