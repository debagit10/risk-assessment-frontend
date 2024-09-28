import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const Test = () => {
  return (
    <div className="min-h-screen bg-custom-bg bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className="backdrop-blur-lg bg-white/10 bg-opacity-50 border border-white/30 shadow-xl rounded-lg p-6 w-96">
        <div>
          <Typography variant="h5" component="div" className="text-white">
            Glassmorphism Effect
          </Typography>
          <Typography variant="body2" className="text-gray-200">
            This card has a glass-like effect with transparency, blur, and
            depth!
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Test;
