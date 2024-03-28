
"use client"
import React, { useEffect, useState } from "react";
import Graph from "@/components/panel/Graph";

const Dashboard: React.FC = () => {
  const [savedPanel, setSavedPanel] = useState<any>(null);

  useEffect(() => {
    // Retrieve saved panel data from local storage
    const savedPanelData = localStorage.getItem("savedPanel");
    if (savedPanelData) {
      // Parse JSON string back into an object
      const parsedSavedPanel = JSON.parse(savedPanelData);
      setSavedPanel(parsedSavedPanel);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {savedPanel && savedPanel.data && (
        <div>
          <h2>{savedPanel.name}</h2>
         
          <Graph data={savedPanel.data.filteredData} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
