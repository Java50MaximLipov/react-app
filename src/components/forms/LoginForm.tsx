import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoginData } from "../../model/LoginData";
import { authService } from "../../config/auth-service-config";
import { Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { codeReducer } from "../../redux/codeSlice";

//  ~~~~~~ HW-41 update start ~~~~~~
function ErrorAlert() {
  const [isOpen, setOpen] = React.useState(false);
  const errorStatus = useSelector(
    (state: ReturnType<typeof codeReducer>) => state.codeState.code
  );
  React.useEffect(() => {
    setOpen(errorStatus !== "OK");
  }, [errorStatus]);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={isOpen}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Error: {errorStatus}. Sign in again.
        </Alert>
      </Collapse>
    </Box>
  );
}
//  ~~~~~~ HW-41 update finish ~~~~~~

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.tel-ran.com/">
        Tel-Ran
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();
type Props = {
  submitFn: (loginData: LoginData) => void;
};

export const LoginForm: React.FC<Props> = ({ submitFn }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    submitFn({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
  };

  //  ~~~~~~ HW-41 update start ~~~~~~
  function handleGoogleSignIn() {
    authService.login({ email: "GOOGLE", password: "" });
  }
  //  ~~~~~~ HW-41 update finish ~~~~~~

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

            {/* ~~~~~~ HW-41 update start ~~~~~~ */}
            <ErrorAlert />
            <Typography component="h1" variant="subtitle1" align="center">
              or
            </Typography>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              endIcon={<GoogleIcon />}
              sx={{ mt: 2, mb: 2 }}
              onClick={handleGoogleSignIn}
            >
              Sign In With Google
            </Button>
            {/* ~~~~~~ HW-41 update finish ~~~~~~ */}

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
