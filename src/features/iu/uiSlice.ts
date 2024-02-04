import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TreeNode } from '../../types/types';

interface UIState {
  isAddDialogOpen: boolean;
  popoverData: {
    node: TreeNode | null;
  };
}

const initialState: UIState = {
  isAddDialogOpen: false,
  popoverData: {
    node: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsAddDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddDialogOpen = action.payload;
    },
    setPopoverData: (
      state,
      action: PayloadAction<{
        node: TreeNode | null;
      }>,
    ) => {
      state.popoverData = action.payload;
    },
  },
});

export const { setIsAddDialogOpen, setPopoverData } = uiSlice.actions;
export default uiSlice.reducer;
