import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Register from "./Register";
import Login from "./Login";
import CreatePosts from "./CreatePosts";
import UserPosts from "./UserPosts";

function Main() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/create">
          <CreatePosts />
        </Route>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/posts">
          <UserPosts />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Main;
