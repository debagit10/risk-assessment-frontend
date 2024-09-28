import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import API_URL from "../Env";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const UploadDoc = () => {
  const [jsonResult, setJsonResult] = useState([]);
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

          const json = XLSX.utils.sheet_to_json(worksheet);

          const startIndex = json.findIndex(
            (row: any) => row.__EMPTY === "Access Control"
          );

          setJsonResult(
            json.slice(startIndex).map((row: any) => ({
              weakness: row.__EMPTY_1,
              risk_level: row.__EMPTY_8,
            }))
          );
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
    if (!fileName) {
      setLoading(false);
      toast.warning("Please select a file", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }

    const sheetData = {
      userID: cookies.userID,
      sheet_name: fileName,
      risks: jsonResult,
    };

    const config = { headers: { "Content-type": "application/json" } };
    try {
      const response = await axios.post(
        `${API_URL.API_URL}/api/sheet/add`,
        sheetData,
        config
      );

      if (response.data.success) {
        setLoading(false);
        toast.success(response.data.success, {
          position: "top-center",
          autoClose: 1500,
          onClose: () => navigate(`/${response.data.sheetID}/summary`),
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
      <Stack spacing={1} sx={{ marginBottom: "7px" }}>
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
      </Stack>
    </div>
  );
};

export default UploadDoc;
