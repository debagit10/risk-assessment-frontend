import { Button, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../Env";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logo from "../../images/logo.png";

interface UserData {
  email: string;
  password: string;
}

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const config = { headers: { "Content-type": "application/json" } };

  const submit = async () => {
    setLoading(true);
    if (!userData.email || !userData.password) {
      setLoading(false);
      toast.warning("Please fill all fields", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL.API_URL}/api/user/login`,
        userData,
        config
      );

      if (response.data.success) {
        setLoading(false);

        toast.success(response.data.success, {
          position: "top-center",
          autoClose: 1500,
          onClose: () => navigate("/upload"),
        });

        setCookie("userID", response.data.user.id);
      } else {
        setLoading(false);
        toast.success(response.data.error, {
          position: "top-center",
          autoClose: 1500,
        });
      }
    } catch (error) {
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
            Login
          </Typography>
          <Stack spacing={2}>
            <TextField
              type="email"
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <TextField
              type="password"
              label="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              onClick={submit}
              disabled={loading}
              sx={{ textTransform: "capitalize" }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Typography variant="body2">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="underline cursor-pointer"
              >
                Sign up
              </span>
            </Typography>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Login;
