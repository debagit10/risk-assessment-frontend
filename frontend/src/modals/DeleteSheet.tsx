import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../Env";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const DeleteSheet = ({ sheetID }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

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
    try {
      const response = await axios.delete(
        `${API_URL.API_URL}/api/sheet/delete?sheetID=${sheetID}`,
        config
      );
      console.log(response.data);
      if (response.data.success) {
        setLoading(false);
        toast.success(response.data.success, {
          position: "top-center",
          autoClose: 1500,
          onClose: () => navigate(`/${cookies.userID}/sheets`),
        });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.response.data.success, {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <Button
        onClick={handleClick}
        variant="outlined"
        sx={{
          textTransform: "capitalize",
          borderColor: "red",
          color: "red",

          "&:hover": {
            backgroundColor: "red",
            color: "white",
            borderColor: "white",
          },
        }}
      >
        Delete
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete sheet?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this sheet?
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
            variant="outlined"
            sx={{ textTransform: "capitalize" }}
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteSheet;
