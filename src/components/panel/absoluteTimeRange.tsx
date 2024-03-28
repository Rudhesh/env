import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";

interface AbsoluteTimeRangeProps {
  onApply: (startTime: string, endTime: string) => void;
}

const AbsoluteTimeRange: React.FC<AbsoluteTimeRangeProps> = ({ onApply }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [buttonText, setButtonText] = useState("Absolute time range");

  const handleApplyClick = () => {
    onApply(startTime, endTime);
    // Update the button text with the selected time range
    setButtonText(`${formatTime(startTime)} - ${formatTime(endTime)}`);
  };

  const formatTime = (time: string) => {
    // Implement your own time formatting logic if needed
    return new Date(time).toLocaleString();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">
          {buttonText}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col bg-gray-50 dark:bg-zinc-950  space-y-4 p-4">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="start-time"
            className="text-sm font-medium text-gray-700"
          >
            Start Time:
          </label>
          <input
            type="datetime-local"
            id="start-time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="end-time"
            className="text-sm font-medium text-gray-700"
          >
            End Time:
          </label>
          <input
            type="datetime-local"
            id="end-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="form-input"
          />
        </div>
        <button
          onClick={handleApplyClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default AbsoluteTimeRange;
