import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import API_URL from "../Env";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const config = { headers: { "Content-type": "application/json" } };

  const submit = async () => {
    setLoading(true);

    if (!password || !confirmPassword) {
      setLoading(false);
      toast.warn("Please fill all fields", {
        position: "top-center",
        autoClose: 1500,
      });

      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      toast.warn("Passwords do not match", {
        position: "top-center",
        autoClose: 1500,
      });

      return;
    }

    try {
      const response = await axios.patch(
        `${API_URL.API_URL}/api/user/changePassword`,
        { id, password },
        config
      );
      console.log(response.data);
      if (response.data.success) {
        setLoading(false);
        toast.success(response.data.success, {
          position: "top-center",
          autoClose: 1500,
          onClose: () => handleClose(),
        });
      }

      if (response.data.error) {
        setLoading(false);
        toast.success(response.data.error, {
          position: "top-center",
          autoClose: 1500,
          onClose: () => handleClose(),
        });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Button
        variant="contained"
        sx={{ textTransform: "capitalize", height: "3rem" }}
        disableElevation
        onClick={handleClick}
      >
        Change password
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Input new password"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              type="password"
              label="New password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              type="password"
              label="Confirm new password"
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Stack>
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
            onClick={submit}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePassword;
