
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TreeNode } from '../../types/types';
import { dataTree } from '../../../actions/actions';
import axios from 'axios';



type InitialState = {
  loading: boolean;
  dataElements: TreeNode[];
  error: string;
  status: 'idle' | 'loading' | 'success' | 'error';
};
const initialState: InitialState = {
  loading: false,
  dataElements: [],
  error: '',
  status: 'idle' 
};





export const fetchDataElements = createAsyncThunk<TreeNode[]>(
  'data/fetchDataElements',
  async () => {

    try {
      const data = dataTree()
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Password Reset Actions
export const initiatePasswordReset = createAsyncThunk(
  'data/initiatePasswordReset',
  async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:44367/api/Identity/getpasswordresettoken/${userId}`);
      // Handle response, possibly show a success message
      const data = await response.data;
      return data
console.log(data)
    } catch (error) {
      throw error;
    }
  }
);

export const resetPassword = createAsyncThunk(
  'data/resetPassword',
  async ({ userId, token, newPassword }: { userId: string; token: string; newPassword: string }) => {
    try {
      const response = await fetch(`http://localhost:44367/api/Identity/resetpassword/${userId}/${token}/${newPassword}`);
      
      return response
    } catch (error) {
      throw error;
    }
  }
);





const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataElements.pending, (state) => {

      state.loading = true;
    });
    builder.addCase(
      fetchDataElements.fulfilled,
      (state, action: PayloadAction<TreeNode[]>) => {
        state.loading = false;
        state.dataElements = action.payload;
        state.error = '';
      },
    );
    builder
      .addCase(fetchDataElements.rejected, (state, action) => {
        state.loading = false;
        state.dataElements = [];
        state.error = action.error.message || 'Something went wrong';
      })
      builder
      .addCase(initiatePasswordReset.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initiatePasswordReset.fulfilled, (state,action) => {
        state.status = 'success';
       
      })
      .addCase(initiatePasswordReset.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message as string;
      });

  },
});

export default dataSlice.reducer;
