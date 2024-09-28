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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav_Container from "../containers/Nav_Container";
import ReUpload from "../modals/ReUpload";
import API_URL from "../Env";
import { useCookies } from "react-cookie";
import DayAndTime from "../utils/DayAndTime";

const Sheets = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [sheets, setSheets] = useState([]);

  const config = { headers: { "Content-type": "application/json" } };

  const userSheets = async () => {
    try {
      const response = await axios.get(
        `${API_URL.API_URL}/api/user/sheets?userID=${cookies.userID}`,
        config
      );
      console.log(response.data);
      setSheets(response.data.sheets);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userSheets();
  }, []);

  return (
    <Nav_Container>
      <div className="mt-24 w-full px-10 py-5">
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
              </TableRow>
            </TableHead>

            {sheets.map((sheet) => (
              <TableBody sx={{ cursor: "pointer" }} key={sheet.id}>
                <TableCell onClick={() => navigate(`/${sheet.id}/summary`)}>
                  {sheet.sheet_name}
                </TableCell>
                <TableCell onClick={() => navigate(`/${sheet.id}/summary`)}>
                  <DayAndTime date={sheet.created_at} />
                </TableCell>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      </div>
    </Nav_Container>
  );
};

export default Sheets;
