import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../redux/reducers/locationReducer";

export default function Modal() {
  const [open, setOpen] = useState(false);
  const city = useSelector((state) => state.locationReducer.location);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!city) setOpen(true);
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please Enter Your Location"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Location"
            variant="outlined"
            onChange={(e) => dispatch(changeLocation(e.target.value))}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
