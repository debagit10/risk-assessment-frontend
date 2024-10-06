import { Card, CardHeader, Typography, Paper } from "@mui/material";
import React from "react";
import UploadDoc from "../components/UploadDoc";
import Nav_Container from "../containers/Nav_Container";
import upload from "../images/upload.png";

const UploadPage = () => {
  return (
    <Nav_Container>
      <div className="mt-32 px-10 backdrop-blur-lg bg-white/10 bg-opacity-50 border border-white/30 shadow-xl rounded-lg text-gray-200 ">
        <div className="underline flex justify-center">
          <Typography variant="h6" fontWeight={500}>
            Upload SpreadSheet Here:
          </Typography>
        </div>
        <div className="flex justify-center">
          <img src={upload} className="w-[30vw] h-[50vh]" />
        </div>
        <div className="flex justify-center">
          <UploadDoc />
        </div>
      </div>
    </Nav_Container>
  );
};

export default UploadPage;
