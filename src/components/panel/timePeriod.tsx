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
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform any validation if needed
    onApply(startTime, endTime);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">
          Absolute time range
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-gray-50 dark:bg-black">
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-2">
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
            <div className="flex items-center space-x-2">
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
            <button type="submit" className="btn btn-primary">
              Apply
            </button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AbsoluteTimeRange;
