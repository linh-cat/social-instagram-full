import React from "react";
import "./Stories.css";

import avatar from "../../assets/img/static.jpg";
import story1 from "../../assets/img/1.jpg";
import story2 from "../../assets/img/2.jpg";
import story3 from "../../assets/img/3.jpg";
import story4 from "../../assets/img/4.jpg";
function Stories() {
  return (
    <section className="stories">
      <figure>
        <picture className="post">
          <img src={avatar} title="story" alt="story" />
          <img src={story1} title="story" alt="story" />
          <img src={story2} title="story" alt="story" />
          <img src={story3} title="story" alt="story" />
          <img src={story4} title="story" alt="story" />
        </picture>
      </figure>
    </section>
  );
}

export default Stories;
