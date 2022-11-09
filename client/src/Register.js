import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { Container, AppBar, Grow, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorDetails, seterrorDetails] = useState("User already exist");
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const [postData, setPostData] = useState({
    email: "",
    password1: "",
    password2: "",
    username: "",
  });
  const [showError, setShowError] = useState(false);
  const checkPasswordEquality = (event) => {
    if (postData.password1 !== event.target.value) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };
  const input1 = useRef();
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(postData);
    if (
      postData.email &&
      postData.password2 &&
      postData.password1 &&
      postData.username
    ) {
      axios
        .post("https://memories-website-application.herokuapp.com/user/signup", {
          email: postData.email,
          password: postData.password1,
          username: postData.username,
        })
        .then((response) => response.data)
        .then((data) => {
          setLoading(false);
          if (data.code === 0) {
            localStorage.setItem("token", data.token);
            history.replace("/");
          }
          console.log(data);
          if (data.message === "error") {
            setIsError(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
          seterrorDetails("Error in sending request, try again");
          setLoading(false);
        });
    } else {
      setIsError(true);
      seterrorDetails("Make sure all fields are filled");
      setLoading(false);
    }
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {isError && (
            <Alert
              severity="error"
              onClose={() => {
                setIsError(false);
              }}
            >
              {errorDetails}
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  name="username"
                  variant="outlined"
                  type="text"
                  label="Username"
                  fullWidth
                  autoComplete="family-name"
                  value={postData.username}
                  onChange={(e) =>
                    setPostData({ ...postData, username: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={postData.email}
                  onChange={(e) =>
                    setPostData({ ...postData, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={postData.password1}
                    fullWidth
                    onChange={(e) => {
                      setPostData({
                        ...postData,
                        password1: e.target.value,
                      });
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={postData.password2}
                    fullWidth
                    onChange={(e) => {
                      setPostData({
                        ...postData,
                        password2: e.target.value,
                      });
                      checkPasswordEquality(e);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />

                  {showError && (
                    <FormHelperText
                      style={{ color: "red" }}
                      id="component-error-text"
                    >
                      Password does not match
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading && <CircularProgress color="inherit" />}
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Register;

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// export default function SignUp() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };
// }
