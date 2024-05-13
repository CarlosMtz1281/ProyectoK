import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BarGraph() {
  return (
    <div className="w-full justify-center flex bg-gray-300 rounded-lg p-3">
      <BarChart
        xAxis={[{ scaleType: "band", data: ["perenganito", "tú", "papu"] }]}
        series={[
          {
            data: [4, 3, 5],
            label: "Respuestas totales",
            color: "blue", // electric green
          },
          {
            data: [1, 6, 3],
            label: "Confianza",
            color: "#FF0000", // electric red
          },
          {
            data: [2, 5, 6],
            label: "Respuestas correctas",
            color: "green", // electric blue
          },
        ]}
        height={200}
        width={700}
      />
    </div>
  );
}
