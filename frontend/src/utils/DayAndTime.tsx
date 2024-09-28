import { Typography } from "@mui/material";
import React from "react";

type DayAndTimeProps = {
  date?: string;
};

const DayAndTime: React.FC<DayAndTimeProps> = ({ date }) => {
  const mailDate = new Date(date as string);

  const formattedDate = mailDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "UTC",
  });

  return (
    <div>
      <Typography variant="caption">{formattedDate}</Typography>
    </div>
  );
};

export default DayAndTime;
