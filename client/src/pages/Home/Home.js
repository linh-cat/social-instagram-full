import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Stories from "../../components/Stories/Stories";
import more from "../../assets/more.svg";
import like from "../../assets/like.svg";
import commentIcon from "../../assets/comment.svg";
import send from "../../assets/send.svg";
import avatar from "../../assets/img/static.jpg";
import smile from "../../assets/smile.svg";
import "./Home.css";
import { useHistory } from "react-router-dom";

function Home() {
  let history = useHistory();
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");

  const commentBody = {
    username: localStorage.getItem("username"),
    body: comment,
  };

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get("/post");
      setPosts(resp.data);
      console.log(resp.data);
    }
    fetchData();
  }, []);

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

  const handleLike = (id, key) => {
    var templateLikes = posts;
    templateLikes[key].likes = templateLikes[key].likes + 1;

    axios
      .post("/post/liked", {
        userLiking: localStorage.getItem("username"),
        postId: id,
      })
      .then((resp) => {
        setPosts(templateLikes);
        window.location.reload();
      });
  };

  const deletePost = (id) => {
    console.log(id);
    axios.delete(`/post/${id}`).then(window.location.reload());
  };

  return (
    <div className="home">
      <Stories />

      {posts.map((val, key) => (
        <section className="post-list" key={val.id}>
          <article>
            <header>
              <div className="user">
                <img src={avatar} alt="avatar" title="avatar" />
                <div className="user-infor">
                  <span>{val.author}</span>
                  <span className="place">{val.location}</span>
                </div>
              </div>
              <div className="dropdown">
                <img src={more} alt="More" className="more" />
                <div className="menu__content">
                  <p className="edit">Edit</p>
                  <p className="delete" onClick={() => deletePost(val.id)}>
                    Delete
                  </p>
                </div>
              </div>
            </header>
            <img src={`http://localhost:3001/files/${val.image}`} alt="" />
            <footer>
              <div className="actions">
                <button type="button">
                  <img
                    src={like}
                    alt="like"
                    title="like"
                    onClick={() => handleLike(val.id, key)}
                  />
                </button>
                <img
                  src={commentIcon}
                  alt="comment"
                  title="comment"
                  onClick={() => history.push(`/post/${val.id}`)}
                />
                <img
                  src={send}
                  alt="share"
                  title="share"
                  onClick={() => alert("this function incomplete!")}
                />
              </div>
              <strong>{val.likes} Likes</strong>
              <p>{val.body}</p>

              <div className="comment">
                <img src={smile} alt="" />
                <input
                  type="text"
                  placeholder="Add comment"
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type="reset" onClick={(e) => postComment(e, val.id)}>
                  Comment
                </button>
              </div>
            </footer>
          </article>
        </section>
      ))}
    </div>
  );
}

export default Home;
