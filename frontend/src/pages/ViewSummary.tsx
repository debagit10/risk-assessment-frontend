import {
  Stack,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Nav_Container from "../containers/Nav_Container";
import API_URL from "../Env";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteSheet from "../modals/DeleteSheet";
import EditRisk from "../modals/EditRisk";
import DayAndTime from "../utils/DayAndTime";

interface FileData {
  id: string;
  sheet_name: string;
  created_at: string;
  updated_at: string;
}

const ViewSummary = () => {
  const [risks, setRisks] = useState([]);
  const [fileDetails, setFileDetails] = useState<FileData>();
  const { id } = useParams();
  const config = { headers: { "Content-type": "application/json" } };

  const getRisks = async () => {
    try {
      const response = await axios.get(
        `${API_URL.API_URL}/api/sheet/risks?sheetID=${id}`,
        config
      );
      console.log(response.data);
      setRisks(response.data.risks);
    } catch (error) {
      console.log(error);
    }
  };

  const sheet = async () => {
    try {
      const response = await axios.get(
        `${API_URL.API_URL}/api/sheet/get?sheetID=${id}`,
        config
      );

      setFileDetails(response.data.sheet);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRisks();
    sheet();
  }, []);

  const getRiskPoints = (riskLevel: any) => {
    switch (riskLevel) {
      case "Low":
        return 7;
      case "Med":
        return 5;
      case "High":
        return 1;
      default:
        return 10;
    }
  };

  const totalPoints = risks.reduce(
    (acc, row) => acc + getRiskPoints(row.risk_level),
    0
  );

  const posssiblePoints = risks.length * 10;

  const currentScore = Math.round((totalPoints / posssiblePoints) * 100);

  return (
    <Nav_Container>
      <div className="mt-32 w-full px-10 m-10 backdrop-blur-lg bg-white/10 bg-opacity-50 border border-white/30 shadow-xl rounded-lg text-gray-200">
        <div className="p-1 underline">
          <Typography variant="h6" fontWeight={500}>
            Summary
          </Typography>
        </div>

        <Stack spacing={0.01}>
          <Stack direction="row" spacing={5}>
            <div>
              {fileDetails && (
                <>
                  <Typography variant="h6" fontWeight={500}>
                    File Name: {fileDetails.sheet_name}
                  </Typography>
                  <Typography variant="h6" fontWeight={500}>
                    Upload Date: <DayAndTime date={fileDetails.created_at} />
                  </Typography>
                  <DeleteSheet sheetID={fileDetails.id} />
                </>
              )}
            </div>

            <div>
              <Stack>
                <Typography>Total points: {totalPoints}</Typography>
                <Typography>Possible points: {posssiblePoints}</Typography>
                <Typography>Score: {currentScore}%</Typography>
              </Stack>
            </div>
          </Stack>

          {risks?.length > 0 && (
            <div className="py-5">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>S/N</TableCell>
                      <TableCell>Weakness</TableCell>
                      <TableCell>Risk Level</TableCell>
                      <TableCell>Point</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {risks.map((row, index) => (
                      <TableRow
                        key={index + 2}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.weakness}</TableCell>
                        <TableCell
                          sx={{
                            backgroundColor:
                              row.risk_level === "Low"
                                ? "green"
                                : row.risk_level === "Med"
                                ? "orange"
                                : row.risk_level === "High"
                                ? "red"
                                : "transparent",
                          }}
                        >
                          {row.risk_level === "Med" ? "Medium" : row.risk_level}
                        </TableCell>
                        <TableCell>
                          {row.risk_level === "Low"
                            ? "7"
                            : row.risk_level === "Med"
                            ? "5"
                            : row.risk_level === "High"
                            ? "1"
                            : "10"}
                        </TableCell>
                        <TableCell>
                          <EditRisk
                            riskID={row.id}
                            cur_risklevel={row.risk_level}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </Stack>
      </div>
    </Nav_Container>
  );
};

export default ViewSummary;
