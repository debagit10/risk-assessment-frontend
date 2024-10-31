import { Typography, Stack, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../images/logo.png";
import axios from "axios";
import API_URL from "../../Env";

interface UserData {
  email: string;
}

const Password = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    email: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    setLoading(true);
    if (!userData.email) {
      setLoading(false);
      toast.warning("Please input your email", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }

    const config = { headers: { "Content-type": "application/json" } };

    try {
      const response = await axios.post(
        `${API_URL.API_URL}/newPassword`,
        userData,
        config
      );
      if (response.data.success) {
        setLoading(false);

        toast.success(response.data.success, {
          position: "top-center",
          autoClose: 1500,
          onClose: () => navigate("/"),
        });
      } else {
        setLoading(false);
        toast.success(response.data.error, {
          position: "top-center",
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #34495e 0%, #bdc3c7 100%)",
      }}
    >
      <div className="p-5 flex justify-center">
        <img src={logo} alt="logo" className="w-64 h-52 " />
      </div>
      <div className="flex justify-center  ">
        <ToastContainer />
        <div className="backdrop-blur-lg bg-white/10 bg-opacity-50 border border-white/30 shadow-xl rounded-lg p-6 w-96 text-gray-200">
          <Typography variant="h6" fontWeight={700} sx={{ marginY: "5%" }}>
            Password recovery
          </Typography>
          <Stack spacing={2}>
            <TextField
              type="email"
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              onClick={submit}
              disabled={loading}
              sx={{ textTransform: "capitalize" }}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Password;
