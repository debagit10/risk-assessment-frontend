import { Button, Typography, Stack } from "@mui/material";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

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
      <div className="flex fixed justify-between w-full z-50 px-10 py-5 mr-10 backdrop-blur-lg bg-white/10 bg-opacity-50 border border-white/30 shadow-xl rounded-lg text-gray-200 ">
        <div className="">
          <Typography variant="h5" fontWeight={700}>
            Risk Summary App
          </Typography>
        </div>
        <Stack spacing={2} direction="row">
          <Button
            onClick={() => navigate("/upload")}
            variant="contained"
            sx={{ textTransform: "capitalise" }}
            disableElevation
          >
            New Upload
          </Button>
          <Button
            onClick={() => navigate(`/${cookies.userID}/sheets`)}
            variant="contained"
            sx={{ textTransform: "capitalise" }}
            disableElevation
          >
            My Sheets
          </Button>
        </Stack>
      </div>

      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default Nav_Container;
