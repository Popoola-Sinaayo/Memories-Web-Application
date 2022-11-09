import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import axios from "axios";
import "../../axiosConfig";
import "./styles.css";
import { createPost, updatePost } from "../../actions/posts";
import { useHistory } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    id: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const getUserInfo = () => {
    axios
      .get("https://memories-website-application.herokuapp.com/user/info")
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        if (result.message !== "error") {
          setPostData((oldData) => {
            return {
              ...oldData,
              creator: result.data.email,
              id: result.data.id,
            };
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("creator", postData.creator);
    newForm.append("title", postData.title);
    newForm.append("message", postData.message);
    newForm.append("id", postData.id);
    newForm.append("image", postData.selectedFile);
    console.log(postData);
    axios
      .post("https://memories-website-application.herokuapp.com/posts/create", newForm)
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        if (result.User) {
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper className="paper">
      <form
        autoComplete="off"
        noValidate
        className="root form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          style={{ marginBottom: "20px" }}
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          style={{ marginBottom: "20px" }}
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          style={{ marginBottom: "20px" }}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div className="fileInput">
          <TextField
            type="file"
            style={{ marginBottom: "20px" }}
            onChange={(e) =>
              setPostData({ ...postData, selectedFile: e.target.files[0] })
            }
            multiple={false}
          />
        </div>
        <Button
          className="buttonSubmit"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
