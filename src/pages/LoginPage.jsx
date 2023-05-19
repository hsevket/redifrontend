import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Alert, AlertTitle } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useAuth } from "../context/authcontext/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestBody = {
      email: data.get("email"),
      password: data.get("password"),
    };
    axios
      .post(
        "https://redi-backend.azurewebsites.net/api/Account/login",
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        
        sessionStorage.setItem("token", JSON.stringify(res.data.token));
        setToken(res.data.token);
        navigate("/");
      })
      .catch((err) => {
        setError(err.status);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        {error !== "" && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Credentials are not Correct —{" "}
            <strong>Please correct your email adress or password</strong>
          </Alert>
        )}
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <NavLink to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
