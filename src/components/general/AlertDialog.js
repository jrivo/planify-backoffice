import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = ({
  message,
  buttonText,
  buttonStyles,
  action,
  open,
  setOpen,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">
     {message}
      </DialogTitle> */}
      <DialogContent
        sx={{
          padding: "40px",
        }}
      >
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={action}
          autoFocus
          sx={{
            backgroundColor: "red",
            color: "#FFF",
            "&:hover": {
              backgroundColor: "red",
              boxShadow: "none",
            },
          }}
        >
          {buttonText ? buttonText : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
