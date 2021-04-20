import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import "./New.css";

function New() {
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [body, setBody] = useState("");

  const upload = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", image);
    data.append("location", location);
    data.append("body", body);
    data.append("author", localStorage.getItem("username"));

    try {
      const resp = await axios.post("post/create-post", data);
      history.push("/");
      console.log(resp.data);
      // history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="new-post">
      <h3>CREATE POST</h3>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <input
        type="text"
        placeholder="Post Location"
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="text"
        placeholder="Body"
        onChange={(e) => setBody(e.target.value)}
      />

      <button type="submit" onClick={upload}>
        Create Post
      </button>
      <button type="button" onClick={() => history.push("/")}>
        Cancel
      </button>
    </form>
  );
}

export default New;
