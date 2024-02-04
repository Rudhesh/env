// src/features/treeDataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TreeNode } from '../types/types';

interface TreeNavigatorState {
  data: TreeNode[];
}

const initialState: TreeNavigatorState = {
  data: [],
};

const treeNavigatorSlice = createSlice({
  name: 'treeNavigator',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TreeNode[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = treeNavigatorSlice.actions;

export default treeNavigatorSlice.reducer;
