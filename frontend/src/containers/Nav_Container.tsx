import { Button, Typography, Stack } from "@mui/material";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logo from "../images/logo.png";
import { FiUpload } from "react-icons/fi";
import { BiSpreadsheet } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";

interface ContainerProps {
  children: ReactNode;
}

const Nav_Container: React.FC<ContainerProps> = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #34495e 0%, #bdc3c7 100%)",
      }}
    >
      <div className="flex fixed justify-between w-full z-50 px-5 py-2 mr-10 backdrop-blur-lg bg-white/10 bg-opacity-50 border border-white/30 shadow-xl rounded-lg text-gray-200 ">
        <div>
          <img src={logo} alt="logo" className="w-36 h-20 cursor-pointer" />
        </div>

        <Stack spacing={2} direction="row" sx={{ marginTop: "1rem" }}>
          <Button
            onClick={() => navigate("/upload")}
            variant="contained"
            sx={{
              textTransform: "capitalize",
              height: "3rem",
            }}
            disableElevation
            startIcon={<FiUpload />}
          >
            Upload
          </Button>
          <Button
            onClick={() => navigate(`/${cookies.userID}/sheets`)}
            variant="contained"
            sx={{ textTransform: "capitalize", height: "3rem" }}
            disableElevation
            startIcon={<BiSpreadsheet />}
          >
            My Sheets
          </Button>

          <Button
            onClick={() => navigate(`/${cookies.userID}/settings`)}
            variant="outlined"
            sx={{ textTransform: "capitalize", height: "3rem" }}
            disableElevation
            startIcon={<IoIosSettings />}
          >
            Settings
          </Button>
        </Stack>
      </div>

      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default Nav_Container;
