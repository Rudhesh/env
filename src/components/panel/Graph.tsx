// components/Graph.tsx

import React from "react";
import Chart from "react-apexcharts";

interface GraphProps {
  channels: string[];
  selectedTime: string;
}

interface DataPoint {
  id: number;
  value: number;
  timestamp: string;
  min: number;
  max: string;
  status: string;
}


const Graph: React.FC<any> = ({ data }) => {
  // Generate dummy data
  // const data = generateData();

  // Parse the data
  const parsedData = data.map((d: { time_stamp: string | number | Date; value: any; }) => ({
    x: new Date(d.time_stamp).getTime(),
    y: d.value,
  }));
console.log(parsedData)
  const options = {
    chart: {
      type: "line",
      width: "100%", // Set the chart width to 100% of its container
    },
    xaxis: {
      type: "datetime",
    },
  } as ApexCharts.ApexOptions;
  return (
    <div>
      <Chart
        options={options}
        series={[{ data: parsedData }]}
        type="line"
        width="100%" // Set the chart width to 100% of its container
        height={400}
      />
    </div>
  );
};

export default Graph;
