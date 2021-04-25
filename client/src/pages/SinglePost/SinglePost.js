import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import "./SinglePost.css";
import avatar from "../../assets/img/static.jpg";
import more from "../../assets/more.svg";
import smile from "../../assets/smile.svg";

function SinglePost() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [post, setPost] = useState({});
  let { postId } = useParams();

  useEffect(() => {
    async function fetchPost() {
      let respPost = await axios.get(`/post/${postId}`);
      setPost(respPost.data[0]);
    }
    async function fetchComment() {
      let respComment = await axios.get(`/post/comment/${postId}`);
      setComments(respComment.data);
    }
    fetchPost();
    fetchComment();
  }, [postId]);

  const commentBody = {
    username: localStorage.getItem("username"),
    body: comment,
  };
  const postComment = (e, id) => {
    e.preventDefault();

    if (commentBody.body === "") {
      alert("No body comment!");
      return;
    }

    axios.post(`/post/comment/${id}`, commentBody);

    alert("Comment Successfully!");
    window.location.reload();
  };

  return (
    <div className="single__post">
      <div className="single__post--image">
        <img src={`http://localhost:3001/files/${post.image}`} alt="" />
      </div>
      <div className="single__post--content">
        <header>
          <div className="user">
            <img src={avatar} alt="" />
            <div className="user-infor">
              <span>{post.author}</span>
              <span className="place">Hcm</span>
            </div>
          </div>
          <img src={more} alt="More" className="more" />
        </header>
        <div className="body">
          <img src={avatar} alt="" />
          <span>{post.author}</span>
          <p>{post.body}</p>
        </div>
        <div className="list__comment">
          {comments.map((comment) => (
            <div className="comment__item">
              <strong>{comment.username}</strong>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
        <div className="comment">
          <img src={smile} alt="" />
          <input
            type="text"
            placeholder="Your comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="button" onClick={(e) => postComment(e, post.id)}>
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
