import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import Nav_Container from "../containers/Nav_Container";
import { CiMail } from "react-icons/ci";
import ChangePassword from "../modals/ChangePassword";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../Env";
import SignOut from "../modals/SignOut";

interface UserData {
  email: string;
  id: string;
}

const Settings = () => {
  const [userData, setUserData] = useState<UserData>({ email: "", id: "" });

  const { id } = useParams();

  const config = { headers: { "Content-type": "application/json" } };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${API_URL.API_URL}/api/user/details?userID=${id}`,
        config
      );
      console.log(response.data);
      setUserData({ email: response.data[0].email, id: response.data[0].id });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Nav_Container>
      <div className="mt-32 w-full px-10 py-5 m-10 backdrop-blur-lg bg-white/10 bg-opacity-50 border border-white/30 shadow-xl rounded-lg text-gray-200">
        <div className="p-3 underline">
          <Typography variant="h6" fontWeight={500}>
            Settings
          </Typography>
        </div>

        <div className="">
          <Stack spacing={2}>
            <div>
              <Stack direction="row" spacing={6}>
                <Typography>Email: </Typography>
                <TextField
                  value={userData?.email} // {userData.email}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{
                          padding: "0.5rem",
                        }}
                      >
                        <IconButton>
                          <CiMail />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </div>

            <div className="">
              <Stack spacing={2}>
                <ChangePassword id={userData?.id} />
                <SignOut />
              </Stack>
            </div>
          </Stack>
        </div>
      </div>
    </Nav_Container>
  );
};

export default Settings;
