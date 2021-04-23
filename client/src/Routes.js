import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Auth/Auth";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import New from "./pages/New/New";
import SinglePost from "./pages/SinglePost/SinglePost";

function Routes() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Auth exact path="/" component={Home} />
      <Auth exact path="/new" component={New} />
      <Auth exact path="/post/:postId" component={SinglePost} />
    </Switch>
  );
}

export default Routes;
