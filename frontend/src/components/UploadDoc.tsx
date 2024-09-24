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
} from "@mui/material";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const UploadDoc = () => {
  const [jsonResult, setJsonResult] = useState([] || null);
  const [sheetName, setSheetName] = useState("");
  const [fileName, setFileName] = useState("");

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setFileName(file.name);

    reader.onload = (e) => {
      const result = e.target.result;
      if (result instanceof ArrayBuffer) {
        const data = new Uint8Array(result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming we're only interested in the first sheet
        const sheetName = "Surface Engineering";

        if (workbook.SheetNames.includes(sheetName)) {
          const worksheet = workbook.Sheets[sheetName];
          setSheetName(sheetName);

          // Convert the worksheet to JSON
          const json = XLSX.utils.sheet_to_json(worksheet);

          const startIndex = json.findIndex(
            (row: any) => row.__EMPTY === "Access Control"
          );

          // Log the JSON and update the state
          //console.log(fileName);
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

  return (
    <div>
      <TextField
        type="file"
        onChange={handleFileUpload}
        placeholder="Upload Document Here"
      />
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
