
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import Chart from "react-apexcharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface GraphProps {
  channels: string[];
  selectedTime: string;
}

interface DataPoint {
  id: number;
  value: number;
  time_stamp: string;
  min: number;
  max: string;
  status: string;
}

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const AreaChartGraph: React.FC<any> = ({ data }) => {
  console.log(data)
  // Generate dummy data
  // const data = generateData();
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = data.filter((item: { time_stamp: string | number | Date; }) => {
    const date = new Date(item.time_stamp);
    console.log({date})
    const now = new Date();
    let daysToSubtract = 365;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });
console.log({filteredData})
//   // Parse the data
//   const parsedData = data.map((d: { time_stamp: string | number | Date; value: any; }) => ({
//     x: new Date(d.time_stamp).getTime(),
//     y: d.value,
//   }));
// console.log(parsedData)
//   const options = {
//     chart: {
//       type: "line",
//       width: "100%", // Set the chart width to 100% of its container
//     },
//     xaxis: {
//       type: "datetime",
//     },
//   } as ApexCharts.ApexOptions;
//   return (
//     <div>
//       <Chart
//         options={options}
//         series={[{ data: parsedData }]}
//         type="line"
//         width="100%" // Set the chart width to 100% of its container
//         height={400}
//       />
//     </div>
//   );

return (
  <Card>
  <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
    <div className="grid flex-1 gap-1 text-center sm:text-left">
      <CardTitle>Area Chart - Interactive</CardTitle>
      <CardDescription>
        Showing total visitors for the last 3 months
      </CardDescription>
    </div>
    <Select value={timeRange} onValueChange={setTimeRange}>
      <SelectTrigger
        className="w-[160px] rounded-lg sm:ml-auto"
        aria-label="Select a value"
      >
        <SelectValue placeholder="Last 3 months" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectItem value="90d" className="rounded-lg">
          Last 3 months
        </SelectItem>
        <SelectItem value="30d" className="rounded-lg">
          Last 30 days
        </SelectItem>
        <SelectItem value="7d" className="rounded-lg">
          Last 7 days
        </SelectItem>
      </SelectContent>
    </Select>
  </CardHeader>
  <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={filteredData}>
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time_stamp"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value)
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
              indicator="dot"
            />
          }
        />
        <Area
          dataKey="max"
          type="natural"
          fill="url(#fillMobile)"
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          dataKey="min"
          type="natural"
          fill="url(#fillDesktop)"
          stroke="var(--color-desktop)"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  </CardContent>
</Card>
)
};

export default AreaChartGraph;
