import React, { useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../redux/reducers/locationReducer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "white",
    position: "absolute",
    top: "92%",
    left: "83%",
  },
}));

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [unitCheck, setUnitCheck] = useState(false);
  const [tempCheck, setTempCheck] = useState(false);
  const [funColors, setFunColors] = useState(true);
  const city = useSelector((state) => state.locationReducer.location);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    unitChange();
    tempChange();
    colorChange();
  });

  const unitChange = () => {
    if (unitCheck) {
      dispatch({ type: "METRIC" });
    } else {
      dispatch({ type: "IMPERIAL" });
    }
  };

  const tempChange = () => {
    if (tempCheck) {
      dispatch({ type: "EXACT" });
    } else {
      dispatch({ type: "ROUNDED" });
    }
  };

  const colorChange = () => {
    if (funColors) {
      dispatch({ type: "COLORS" });
    } else if (!funColors) {
      dispatch({ type: "BLACK" });
    }
  };

  return (
    <>
      <IconButton className={classes.icon} onClick={() => setOpen(true)}>
        <SettingsIcon fontSize="large" />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem>Units</ListItem>
          <ListItem>
            <Grid container alignItems="center">
              <Grid item>Imperial</Grid>
              <Grid item>
                <Switch
                  checked={unitCheck}
                  onChange={() => setUnitCheck(!unitCheck)}
                ></Switch>
              </Grid>
              <Grid item>Metric</Grid>
            </Grid>
          </ListItem>
          <ListItem>Exact Values</ListItem>
          <ListItem>
            <Grid container alignItems="center">
              <Grid item>Off</Grid>
              <Grid item>
                <Switch
                  checked={tempCheck}
                  onChange={() => setTempCheck(!tempCheck)}
                ></Switch>
              </Grid>
              <Grid item>On</Grid>
            </Grid>
          </ListItem>
          <ListItem>Fun Colors</ListItem>
          <ListItem>
            <Grid container alignItems="center">
              <Grid item>Off</Grid>
              <Grid item>
                <Switch
                  checked={funColors}
                  onChange={() => setFunColors(!funColors)}
                ></Switch>
              </Grid>
              <Grid item>On</Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <TextField
              label="Location"
              variant="outlined"
              value={city}
              onChange={(e) => dispatch(changeLocation(e.target.value))}
            ></TextField>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
