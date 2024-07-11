import React from "react";
import { Button } from "@/components/ui/button";

interface GraphTypeButtonsProps {
  graphType: string;
  setGraphType: (type: string) => void;
}

const GraphTypeButtons: React.FC<GraphTypeButtonsProps> = ({
  graphType,
  setGraphType,
}) => {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <p className="mb-2">Choose graph type</p>

      <Button variant="outline" onClick={() => setGraphType("AreaChart")}>
        Area Chart
      </Button>
      <Button variant="outline" onClick={() => setGraphType("LineChart")}>
        Line Chart
      </Button>
      <Button variant="outline" onClick={() => setGraphType("BarChart")}>
        Bar Chart
      </Button>
      <Button variant="outline" onClick={() => setGraphType("RadarChart")}>
        Radar Chart
      </Button>
    </div>
  );
};

export default GraphTypeButtons;
