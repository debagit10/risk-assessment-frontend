import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

const ReUpload = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="outlined"
        sx={{ textTransform: "capitalize" }}
      >
        Re-upload
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Re-upload?</DialogTitle>
        <DialogContent>
          Are you sure you want to re-upload this sheet?
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{
              borderColor: "red",
              color: "red",

              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "red",
                color: "white",
                borderColor: "white",
              },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="outlined" sx={{ textTransform: "capitalize" }}>
            Re-upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReUpload;
