import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import Axios from "axios";
import "../../axiosConfig";
import "./styles.css";
const Posts = ({ setCurrentId }) => {
  const [posts, setposts] = useState([]);
  const getPost = () => {
    Axios.get("https://memories-website-application.herokuapp.com/posts/get")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setposts(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPost();
  }, []);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid className="container" container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
