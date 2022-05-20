import React from "react";
import DisplayReplies from "../DisplayReplies/DisplayReplies";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
const Comments = (props) => {
  const [user, token] = useAuth();

  async function handleLikes(comment_id) {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/comments/${comment_id}/likes/`
      );
      props.getComments();
    } catch (error) {
      console.log(token);
      console.log(error.message);
    }
  }
  async function handleDislikes(comment_id) {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/comments/${comment_id}/dislikes/`
      );
      props.getComments();
    } catch (error) {
      console.log(token);
      console.log(error.message);
    }
  }
  return (
    <div>
      {props.comments.map((el) => {
        if (el.video_id === props.videoId) {
          return (
            <div className="replies-box" key={el.id}>
              <h4>Comments</h4>{" "}
              <div style={{ display: "flex"}}>
                <p>{el.text}</p>
                <button
                  className="search-button"
                  onClick={() => {
                    handleLikes(el.id);
                  }}
                >
                  Like {el.likes}
                </button>
                <button
                  className="search-button"
                  onClick={() => {
                    handleDislikes(el.id);
                  }}
                >
                  Dislike {el.dislikes}
                </button>
              </div>
              <hr/>
              <div>
                <DisplayReplies commentId={el.id} />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Comments;
