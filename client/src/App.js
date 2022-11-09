import React, { useState } from "react";
import { Container, Grow, Grid } from "@mui/material";
import "./css/loading.css";
import Posts from "./components/Posts/Posts";
import "./axiosConfig";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./redux/slice/postsSlice";
import TopNav from "./components/TopNav";

const MainComponent = () => {
  const [currentId, setCurrentId] = useState(0);
  return (
    <Grow in>
      <Container>
        <Grid item xs={12}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
      </Container>
    </Grow>
  );
};
export default function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.user.authStatus);
  console.log(authStatus);
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return <TopNav Child={MainComponent} />;
}
