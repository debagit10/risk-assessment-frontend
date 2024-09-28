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
    <>
      <div className="flex fixed justify-between w-full z-50 px-10 py-5 bg-white ">
        <div className="">
          <Typography variant="h5" fontWeight={700}>
            Risk Summary App
          </Typography>
        </div>
        <Stack spacing={2} direction="row">
          <Button onClick={() => navigate("/upload")} variant="outlined">
            New Upload
          </Button>
          <Button
            onClick={() => navigate(`/${cookies.userID}/sheets`)}
            variant="outlined"
          >
            My Sheets
          </Button>
        </Stack>
      </div>
      <div className="flex justify-center ">{children}</div>
    </>
  );
};

export default Nav_Container;
