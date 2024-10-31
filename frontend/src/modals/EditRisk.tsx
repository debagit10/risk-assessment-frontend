import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../Env";

const EditRisk = ({ riskID, cur_risklevel }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [risk_level, setRiskLevel] = useState("");
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
    const data = { riskID, risk_level };
    try {
      const response = await axios.patch(
        `${API_URL.API_URL}/api/risks/update`,
        data,
        config
      );
      console.log(response);
      if (response.data.success) {
        setLoading(false);
        toast.success(response.data.success, {
          position: "top-center",
          autoClose: 1500,
          onClose: () => {
            handleClose();
            window.location.reload();
          },
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
          borderColor: "white",
          color: "white",

          "&:hover": {
            backgroundColor: "white",
            color: "black",
            borderColor: "white",
          },
        }}
      >
        Edit
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit risk level</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Risk level
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={cur_risklevel}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Low"
                control={<Radio />}
                label="Low"
                onClick={() => setRiskLevel("Low")}
              />
              <FormControlLabel
                onClick={() => setRiskLevel("Med")}
                value="Med"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel
                value="High"
                control={<Radio />}
                label="High"
                onClick={() => setRiskLevel("High")}
              />
              <FormControlLabel
                value="No risk"
                control={<Radio />}
                label="No risk"
                onClick={() => setRiskLevel("No risk")}
              />
            </RadioGroup>
          </FormControl>
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
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditRisk;
