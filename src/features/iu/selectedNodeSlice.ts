import { createSlice } from '@reduxjs/toolkit';

const selectedNodeSlice = createSlice({
  name: 'selectedNode',
  initialState: {
    node: null,
    expanded: false,
    searchTerm: '',
  },
  reducers: {
    setSelectedNode: (state, action) => {
      state.node = action.payload.node;
      state.expanded = action.payload.expanded;
      state.searchTerm = action.payload.searchTerm;
    },
  },
});

export const { setSelectedNode } = selectedNodeSlice.actions;
export default selectedNodeSlice.reducer;
