import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { PiSignOutBold } from "react-icons/pi";

const SignOut = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setLoading(true);
    setTimeout(() => {
      removeCookie("userID");
      navigate("/");
    }, 3000);
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ textTransform: "capitalize", height: "3rem" }}
        disableElevation
        startIcon={<PiSignOutBold />}
        onClick={handleClick}
      >
        Sign out
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm sign out"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to sign out?
          </DialogContentText>
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
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
            }}
            disabled={loading}
            onClick={handleSignOut}
          >
            {loading ? "Signing out..." : "Sign out"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignOut;
