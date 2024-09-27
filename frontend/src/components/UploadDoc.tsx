import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import API_URL from "../Env";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const UploadDoc = () => {
  const [jsonResult, setJsonResult] = useState([] || null);
  const [sheetName, setSheetName] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setFileName(file.name);

    reader.onload = (e) => {
      const result = e.target.result;
      if (result instanceof ArrayBuffer) {
        const data = new Uint8Array(result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = "Surface Engineering";

        if (workbook.SheetNames.includes(sheetName)) {
          const worksheet = workbook.Sheets[sheetName];
          setSheetName(sheetName);

          const json = XLSX.utils.sheet_to_json(worksheet);

          const startIndex = json.findIndex(
            (row: any) => row.__EMPTY === "Access Control"
          );

          setJsonResult(json.slice(startIndex));
        } else {
          console.error(
            `Sheet named "${sheetName}" not found in the workbook.`
          );
        }
      } else {
        console.error("Unexpected result type from FileReader:", typeof result);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const submit = async () => {
    setLoading(true);
    if (!sheetName) {
      setLoading(false);
      toast.warning("Please select a file", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }

    const sheetData = { userID: cookies.userID, sheet_name: sheetName };

    const config = { headers: { Content_type: "application/json" } };
    try {
      const response = await axios.post(
        `${API_URL.API_URL}/api/sheet/add`,
        sheetData,
        config
      );

      if (response.data.success) {
        toast.success(response.data.success, {
          position: "top-center",
          autoClose: 1500,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <TextField
        type="file"
        onChange={handleFileUpload}
        placeholder="Upload Document Here"
      />

      <Button
        variant="contained"
        onClick={submit}
        disabled={loading}
        sx={{ textTransform: "capitalize" }}
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>
      {jsonResult.length > 0 && (
        <>
          <Typography>{fileName}</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell>Item Identifier</TableCell>
                  <TableCell>Weakness</TableCell>
                  <TableCell>Security Control</TableCell>
                  <TableCell>Resources Required</TableCell>
                  <TableCell>Risk Level</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jsonResult.slice(2).map((row, index) => (
                  <TableRow
                    key={index + 2}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.__EMPTY}</TableCell>
                    <TableCell>{row.__EMPTY_1}</TableCell>
                    <TableCell>{row.__EMPTY_2}</TableCell>
                    <TableCell>{row.__EMPTY_3}</TableCell>
                    <TableCell
                      sx={{
                        backgroundColor:
                          row.__EMPTY_8 === "Low"
                            ? "green"
                            : row.__EMPTY_8 === "Med"
                            ? "orange"
                            : "red",
                      }}
                    >
                      {row.__EMPTY_8}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default UploadDoc;
