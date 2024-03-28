// src/redux/dataSlice.js
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DataPoint {
    id: number;
    value: number;
    time_stamp: string;
    min: number;
    max: string;
    status: string;
    // Add other properties from your JSON data if needed
  }

  interface FilterData {
    filteredData: DataPoint[]; // Adjust DataPoint to the actual type of your data points
  }
  
  // Define the initial state
  const initialState: FilterData = {
    filteredData: [],
  };

export const dataSlice = createSlice({
  name: 'filterData',
  initialState,
  reducers: {
    setFilteredData: (state, action: PayloadAction<DataPoint[]>) => {
      state.filteredData = action.payload;
    },
  },
});

export const { setFilteredData } = dataSlice.actions;


export default dataSlice.reducer;
