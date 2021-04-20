import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Stories from "../../components/Stories/Stories";
import more from "../../assets/more.svg";
import like from "../../assets/like.svg";
import comment from "../../assets/comment.svg";
import send from "../../assets/send.svg";
import avatar from "../../assets/img/static.jpg";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get("/post");
      setPosts(resp.data);
      console.log(resp.data);
    }
    fetchData();
  }, []);

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

              <img src={more} alt="More" />
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
                  src={comment}
                  alt="comment"
                  title="comment"
                  onClick={() => alert("this function incomplete!")}
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
            </footer>
          </article>
        </section>
      ))}
    </div>
  );
}

export default Home;
