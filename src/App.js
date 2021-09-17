import React from "react";
import Home from "./components/home";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     background: "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)",
//     height: "100vh",
//     color: "white",
//   },
// }));

export default function App() {
  // const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      {/* <Box className={classes.root}> */}
      <Home />
      {/* </Box> */}
    </ThemeProvider>
  );
}
