import React, { useState } from "react";
import { Grid } from "@mui/material";
import Form from "./components/Form/Form";
import TopNav from "./components/TopNav";

const FormComponent = () => {
    const [currentId, setCurrentId] = useState("");
  return (
    <Grid
      style={{
        textAlign: "center",
        margin: "auto",
        marginLeft: "10rem",
        marginRight: "10rem",
      }}
    >
      <Form currentId={currentId} setCurrentId={setCurrentId} />
    </Grid>
  );
};
function CreatePosts() {
  return <TopNav Child={FormComponent} />;
}

export default CreatePosts;
