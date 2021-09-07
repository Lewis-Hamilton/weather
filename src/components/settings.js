import React, { useEffect, useState } from "react";
import axios from "axios";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState("imperial");
  const [city, setCity] = useState("Unkown");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    unitChange();
  });

  const unitChange = () => {
    if (check === true) {
      setUnit("metric");
    } else {
      setUnit("imperial");
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
              onChange={(e) => setCity(e.target.value)}
            ></TextField>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
