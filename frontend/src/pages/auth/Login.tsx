import { Button, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";

interface UserData {
  email: string;
  password: string;
}

const Login = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = () => {
    console.log(userData);
  };

  return (
    <div className="flex justify-center  my-10 ">
      <Paper elevation={4} sx={{ paddingX: "5%", paddingBottom: "5%" }}>
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

          <Button variant="contained" onClick={submit}>
            Login
          </Button>
        </Stack>
      </Paper>
    </div>
  );
};

export default Login;
