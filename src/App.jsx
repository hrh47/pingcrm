import logo from "./assets/logo.svg";
import "./App.css";
import { AppBar, Box, Grid, Typography } from "@mui/material";

function App() {
  return (
    <>
      <AppBar
        sx={{
          display: "inline-block",
        }}
      >
        <Grid container spacing={0}>
          <Grid item sm={12} md={3}>
            <a href="#">
              <img src={logo} alt="PingCRM logo" />
            </a>
          </Grid>
          <Grid
            item
            sm={12}
            md={9}
            sx={{
              color: "black",
              backgroundColor: "white",
              p: "1rem",
              px: { sm: "0rem", md: "6rem" },
            }}
          >
            <Box>
              <Typography variant="h6" component="h2">
                Acme Corporation
              </Typography>
            </Box>
            <Box></Box>
          </Grid>
        </Grid>
      </AppBar>

      <Typography variant="h4" component="h1">
        Dashboard
      </Typography>
    </>
  );
}

export default App;
