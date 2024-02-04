
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Channels, Groups } from '../../types/types';
import { TreeNode } from '../../types/types';
import axios from '../../../axiosConfig';
import { useDataElementsRepository } from '@/repositories/userRepository';


type InitialState = {
  loading: boolean;
  dataElements: TreeNode[];
  error: string;
};
const initialState: InitialState = {
  loading: false,
  dataElements: [],
  error: '',
};

if (typeof window !== 'undefined') {
  console.log('Running on the client side');
} else {
  console.log('Running on the server side');
}



// export const fetchDataElements = createAsyncThunk(
//   'data/fetchDataElements',
//   async () => {
//     try {
//       const response = await axios.get('/api/dataElement');
     
//       return response.data.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );




export const fetchDataElements = createAsyncThunk<TreeNode[]>(
  'data/fetchDataElements',
  async () => {
   
    try {
      const dataElementRepository =  useDataElementsRepository();
      const data = await dataElementRepository.getAll();
  
      return data;
    } catch (error) {
      throw error;
    }
  }
);



export const getUsers = createAsyncThunk(
  'data/getUsers',
  async () => {
    try {
      const response = await axios.get('/api/dentity/getusers');
    
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewGroup = createAsyncThunk(
  'data/addNewGroup',
  async (payload: { newGroup: Groups; parentgroupId: string | null }) => {
    const { newGroup, parentgroupId } = payload;
    try {
      await axios.post('http://localhost:5236/api/DataElement/creategroup', {
        ...newGroup,
        parentgroupId,
      });
      return;
    } catch (error) {
      throw error;
    }
  },
);

export const addNewChannel = createAsyncThunk(
  'data/addNewChannel',
  async (payload: { newChannel: Channels; parentgroupId: string }) => {
    const { newChannel, parentgroupId } = payload;
    try {
      await axios.post(
        'http://localhost:5236/api/DataElement/createdatachannel',

        { ...newChannel, parentgroupId },
      );
      return;
    } catch (error) {
      throw error;
    }
  },
);

export const renameDataElement = createAsyncThunk(
  'data/renameDataElement',
  async (payload: { dataElementId: string; name: string; groupId: string }) => {
    const { dataElementId, name, groupId } = payload;
    try {
      await axios.put(
        `http://localhost:5236/api/DataElement/updategroup/${dataElementId}`,
        { dataElementId, name, groupId },
      );
      return payload;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteDataElement = createAsyncThunk(
  'data/deleteDataElement',
  async (dataElementId: string) => {
    try {
      await axios.delete(
        `http://localhost:5236/api/DataElement/${dataElementId}`,
      );
      return dataElementId; // Return the dataElementId to indicate which element was deleted
    } catch (error) {
      throw error;
    }
  },
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
      .addCase(addNewGroup.fulfilled, (state) => {
        // Assuming you want to refetch data after adding a group
        state.loading = true;
      })
      .addCase(addNewChannel.fulfilled, (state) => {
        // Assuming you want to refetch data after adding a channel
        state.loading = true;
      })
      .addCase(renameDataElement.fulfilled, (state, action) => {
        // Update the name of the renamed element in the state
        const { dataElementId, name } = action.meta.arg;
        const elementIndex = state.dataElements.findIndex(
          (element) => element.dataElementId === dataElementId,
        );
        if (elementIndex !== -1) {
          state.dataElements[elementIndex].name = name;
        }
      })

      .addCase(deleteDataElement.fulfilled, (state, action) => {
        // Remove the deleted element from the state
        const dataElementId = action.payload;
        state.dataElements = state.dataElements.filter(
          (element) => element.dataElementId !== dataElementId,
        );
      });
  },
});

export default dataSlice.reducer;
