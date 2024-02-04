// searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  selectedKey: null,
  filteredDataElements: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
    setFilteredDataElements: (state, action) => {
      state.filteredDataElements = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedKey, setFilteredDataElements } =
  searchSlice.actions;
export default searchSlice.reducer;
