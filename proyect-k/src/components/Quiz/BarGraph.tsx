import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BarGraph() {
  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: ["perenganito", "tú", "papu"] }]}
      series={[
        { data: [7,2,1], color: "#f28e2c" },
      ]}
      borderRadius={32}
    />
  );
}
