import { Stack, Typography } from "@mui/material";
import React from "react";
import Nav_Container from "../containers/Nav_Container";

const ViewSummary = () => {
  return (
    <Nav_Container>
      <div className="mt-24 w-full px-10">
        <div className="p-1 underline">
          <Typography variant="h6" fontWeight={500}>
            Summary
          </Typography>
        </div>

        <Stack spacing={0.01}>
          <Typography variant="h6" fontWeight={500}>
            Sheet Name: a_sheet.xlsx
          </Typography>
          <Typography variant="h6" fontWeight={500}>
            Upload Date: 12th of March, 2024
          </Typography>
          <Typography variant="h6" fontWeight={500}>
            Re-Upload Date: Null
          </Typography>
        </Stack>
      </div>
    </Nav_Container>
  );
};

export default ViewSummary;
