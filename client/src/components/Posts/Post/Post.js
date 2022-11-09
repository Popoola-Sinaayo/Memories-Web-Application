import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../../../axiosConfig";
import { likePost } from "../../../actions/posts";
import "./styles.css";

const Post = ({ post, setCurrentId }) => {
  const [count, setCount] = useState(post.likeCount);
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const likePost = () => {
    axios
      .put(`https://memories-website-application.herokuapp.com/posts/${post._id}`)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setCount(data.likeCount);
      })
      .catch((err) => console.log(err));
  };
  const getUserInfo = () => {
    axios
      .get("https://memories-website-application.herokuapp.com/user/info")
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        if (result.message !== "error") {
          setId(result.data.id);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  const deletePost = async (id) => {
    const response = await axios.get(
      `https://memories-website-application.herokuapp.com/posts/delete/${id}`
    );
    const data = await response.data;
    if (data.message !== "error") {
      window.location.reload();
    }
  };
  return (
    <Card className="card">
      <CardMedia
        className="media"
        image={
          `https://memories-website-application.herokuapp.com/image/${post.selectedFile}` ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className="overlay">
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className="overlay2">
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className="details">
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className="title" gutterBottom variant="h5" component="h2">
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className="cardActions">
        <Button size="small" color="primary" onClick={likePost}>
          <ThumbUpAltIcon fontSize="small" /> Like {count}{" "}
        </Button>
        {post.User === id && (
          <Button
            size="small"
            color="primary"
            onClick={() => deletePost(post._id)}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
