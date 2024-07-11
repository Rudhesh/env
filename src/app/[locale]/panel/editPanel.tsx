"use client";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SearchBar from "@/components/panel/searchBar";
import AbsoluteTimeRange from "@/components/panel/absoluteTimeRange";
import Graph from "@/components/panel/Graph";
import { DataTable } from "@/components/data-table";
import Sidebar from "@/components/panel/Sidebar";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFilteredData } from "@/features/data/filterDataSlice";
import AreaChartGraph from "@/components/panel/AreaChartGraph";
import LineChartGraph from "@/components/panel/LineChartGraph";
import BarChartGraph from "@/components/panel/BarChartGraph";
import GraphTypeButtons from "@/components/ui/graphTypeButtons";
import RadarChartGraph from "@/components/panel/RadarChartGraph";

interface DataPoint {
  id: number;
  value: number;
  time_stamp: string;
  min: number;
  max: string;
  status: string;
  // Add other properties from your JSON data if needed
}

interface GraphProps {
  data: DataPoint[];
  name?: string;
}

const EditPanel: React.FC<GraphProps> = ({ data, name }) => {
  console.log({ data });
  const [originalData, setOriginalData] = useState<DataPoint[]>([]); // Original data from the server
  const [graphType, setGraphType] = useState("AreaChart"); // State to manage graph type

  const filterData = useAppSelector((state) => state.filterData);
  const dispatch = useAppDispatch();
  console.log({ filterData });

  useEffect(() => {
    setOriginalData(data);
    dispatch(setFilteredData(data)); // Initialize filteredData with data from props
    // Rest of your useEffect logic...
  }, [data, dispatch]);

  // Inside the EditPanel component
  console.log({ originalData });
  const [panelName, setPanelName] = useState("");
  useEffect(() => {
    // Fetch data from your server and set it to both originalData and filteredData
    // Example: axios.get('/api/data').then((response) => setOriginalData(response.data));
    setOriginalData(data);
    const savedPanel = localStorage.getItem("savedPanel");
    console.log({ savedPanel });
    if (savedPanel) {
      const parsedPanel = JSON.parse(savedPanel);
      setPanelName(parsedPanel.name);
      setFilteredData(parsedPanel.data);
    }
  }, []);

  const generateUniqueId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleSavePanel = () => {
    const uniqueId = generateUniqueId(); // Generate a unique ID for the new panel
    const newPanel = {
      id: uniqueId,
      name: panelName,
      data: filterData,
    };

    // Retrieve existing panels
    const savedPanels = JSON.parse(localStorage.getItem("savedPanels") || "{}");

    // Add the new panel
    savedPanels[uniqueId] = newPanel;

    // Save the updated panels back to localStorage
    localStorage.setItem("savedPanels", JSON.stringify(savedPanels));
  };

  const handleClearSavedPanel = () => {
    // Clear the saved panel from localStorage
    localStorage.removeItem("savedPanel");
  };

  // Add this input field in your component

  const handleSearch = (query: string) => {
    const filtered = originalData.filter(
      (item) =>
        // Implement your search logic here
        item.id.toString().includes(query) ||
        item.value.toString().includes(query) ||
        item.time_stamp.includes(query)
    );
    dispatch(setFilteredData(filtered));
  };

  const handleTimeRange = (startTime: string, endTime: string) => {
    const filtered = originalData.filter(
      (item) =>
        // Check if the time_stamp is within the specified range
        new Date(item.time_stamp) >= new Date(startTime) &&
        new Date(item.time_stamp) <= new Date(endTime)
    );
    console.log({ filtered });
    dispatch(setFilteredData(filtered));
  };
  console.log(filterData.filteredData);

  const renderGraph = () => {
    switch (graphType) {
      case "LineChart":
        return <LineChartGraph data={filterData.filteredData} />;
      case "BarChart":
        return <BarChartGraph data={filterData.filteredData} />;
      case "AreaChart":
      default:
        return <AreaChartGraph data={filterData.filteredData} />;
      case "RadarChart":
     
        return <RadarChartGraph data={filterData.filteredData} />;
    }
  };

  return (
    <div className="dark:text-white flex h-screen">
      <ResizablePanelGroup direction="horizontal" className="max-w-screen">
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <div className="flex justify-between items-center  p-4 m-2">
              <Input
                type="text"
                placeholder="Enter Panel Name"
                value={panelName}
                onChange={(e) => setPanelName(e.target.value)}
                style={{ width: "300px" }} // Inline style for width
              />

              {name ? (
                <Input
                  type="text"
                  placeholder="Enter Panel Name"
                  value={name}
                  onChange={(e) => setPanelName(e.target.value)}
                  style={{ width: "300px" }} // Inline style for width
                />
              ) : null}

              <div className="flex">
                {" "}
                <div className="mr-4">
                  <SearchBar onSearch={handleSearch} />
                </div>{" "}
                <AbsoluteTimeRange onApply={handleTimeRange} />
              </div>
            </div>

            <ResizablePanel defaultSize={40}>
              <div className=" p-4 m-2">
                {/* <div className="flex space-x-2 mb-4">
              <GraphTypeButtons graphType={graphType} setGraphType={setGraphType} />
                </div> */}
                {renderGraph()}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60}>
              <div
                className="p-4 m-2"
                style={{ height: "100%", overflow: "auto" }}
              >
                <DataTable columns={columns} data={filterData.filteredData} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20}>
          <div className="  p-4 m-2 ">
            {" "}
            <div className="flex space-x-2 mb-4">

            <Button variant="outline" className=" px-4 py-2 ">
              Share
            </Button>
            <Button
              onClick={handleClearSavedPanel}
              variant="outline"
              className=" px-4 py-2 "
            >
              Delete
            </Button>
            <Button
              onClick={handleSavePanel}
              variant="outline"
              className=" px-4 py-2 "
            >
              Save
            </Button>
            </div>
            <GraphTypeButtons graphType={graphType} setGraphType={setGraphType} />
            <Sidebar />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default EditPanel;
