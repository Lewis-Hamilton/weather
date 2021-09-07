import React, { useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { changeLocation } from "../redux/reducers/locationReducer";

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    unitChange();
  });

  const unitChange = () => {
    if (check === true) {
      dispatch({ type: "METRIC" });
    } else {
      dispatch({ type: "IMPERIAL" });
    }
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <SettingsIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem>
            <Grid container alignItems="center">
              <Grid item>Imperial</Grid>
              <Grid item>
                <Switch
                  checked={check}
                  onChange={() => setCheck(!check)}
                ></Switch>
              </Grid>
              <Grid item>Metric</Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <TextField
              label="Location"
              variant="outlined"
              onChange={(e) => dispatch(changeLocation(e.target.value))}
            ></TextField>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
