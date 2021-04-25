import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useHistory, useParams } from "react-router-dom";
import "./Profile.css";
import avatar from "../../assets/img/static.jpg";
import story1 from "../../assets/img/1.jpg";
import story2 from "../../assets/img/3.jpg";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

function Profile() {
  let { userId } = useParams();

  let username = localStorage.getItem("username");

  let history = useHistory();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchPost() {
      let postData = await axios.get(`/post/user/${username}`);
      if (postData.data) {
        setPosts(postData.data);
      }
    }
    async function fetchUser() {
      let user = await axios.get(`/user/${userId}`);
      if (user.data) {
        setUser(user.data[0]);
      }
    }
    fetchUser();
    fetchPost();
  }, [userId, username]);

  console.log(username);
  return (
    <div className="profile">
      <header>
        <img src={avatar} alt="" />
        <div className="profile__content">
          <div>
            <h3>{localStorage.getItem("username")}</h3>
            <button>Message</button>
          </div>
          <p>Address: {user.address}.</p>
          <p>Email: {user.email}.</p>
        </div>
      </header>
      <div className="story">
        <figure>
          <picture>
            <img src={story1} title="story" alt="story" />
            <img src={story2} title="story" alt="story" />
            <img src={story2} title="story" alt="story" />
            <img src={story2} title="story" alt="story" />
          </picture>
        </figure>
      </div>
      <div className="list__post">
        {posts.map((post) => (
          <div
            className="list__post--item"
            key={post.id}
            onClick={() => history.push(`/post/${post.id}`)}
          >
            <img
              src={`http://localhost:3001/files/${post.image}`}
              alt=""
              className="post-image"
            />
            <div className="list__icon">
              <FavoriteIcon />
              <p>{post.likes}</p>
              <ChatBubbleIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
