import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Nav_Container from "../containers/Nav_Container";
import ReUpload from "../modals/ReUpload";

const Sheets = () => {
  const navigate = useNavigate();
  return (
    <Nav_Container>
      <div className="mt-24 w-full px-10">
        <TableContainer component={Paper}>
          <div className="p-3 underline">
            <Typography variant="h6" fontWeight={500}>
              My Sheets
            </Typography>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sheet Name</TableCell>
                <TableCell>Upload date</TableCell>
                <TableCell>Re-upload date</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody sx={{ cursor: "pointer" }}>
              <TableCell onClick={() => navigate("/123/summary")}>
                spreadsheet.xlsx
              </TableCell>
              <TableCell onClick={() => navigate("/123/summary")}>
                12pm on Friday
              </TableCell>
              <TableCell onClick={() => navigate("/123/summary")}>
                null
              </TableCell>
              <TableCell>
                <ReUpload />
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Nav_Container>
  );
};

export default Sheets;
