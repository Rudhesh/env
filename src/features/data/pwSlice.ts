// passwordResetSlice.ts
import { User } from '@/types/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { userData } from '../../../actions/actions';

interface userData {
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  user: User[];
}

const initialState: userData = {
  status: 'idle',
  error: null,
  user: []
};

// export const initiatePasswordReset = createAsyncThunk(
//     'data/initiatePasswordReset',
//     async (userId: string) => {
//       try {
//         const response = await axios.get(`http://localhost:44367/api/Identity/getpasswordresettoken/${userId}`);
//         // Handle response, possibly show a success message
//         const data = await response.data;
//         return data
//   console.log(data)
//       } catch (error) {
//         throw error;
//       }
//     }
//   );
//   export const resetPassword = createAsyncThunk(
//     'data/resetPassword',
//     async ({ userId, token, newPassword }: { userId: string; token: string; newPassword: string }) => {
//       try {
//         const response = await fetch(`http://localhost:44367/api/Identity/resetpassword/${userId}/${token}/${newPassword}`);
        
//         return response
//       } catch (error) {
//         throw error;
//       }
//     }
//   );
  
export const fetchUserData = createAsyncThunk<User[]>(
  'data/fetchDataElements',
  async () => {

    try {
      const data = userData()
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const userDataItem = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled,  (state, action: PayloadAction<User[]>) => {
        state.status = 'loading';
        state.user = action.payload;
        state.error = '';
      },)
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message as string;
      });
  },
});

export default userDataItem.reducer;
