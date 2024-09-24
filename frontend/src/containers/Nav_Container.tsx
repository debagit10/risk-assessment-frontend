import { Button, Typography, Stack } from "@mui/material";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ContainerProps {
  children: ReactNode;
}

const Nav_Container: React.FC<ContainerProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex fixed justify-between w-full z-50 px-10 py-5 ">
        <div className="">
          <Typography variant="h5" fontWeight={700}>
            Risk Summary App
          </Typography>
        </div>
        <Stack spacing={2} direction="row">
          <Button onClick={() => navigate("/upload")} variant="outlined">
            New Upload
          </Button>
          <Button onClick={() => navigate("/1234/sheets")} variant="outlined">
            My Sheets
          </Button>
        </Stack>
      </div>
      <div className="flex justify-center ">{children}</div>
    </>
  );
};

export default Nav_Container;
