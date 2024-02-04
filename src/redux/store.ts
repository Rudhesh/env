import { configureStore } from '@reduxjs/toolkit';
import treeDataReducer from '../features/data/dataSlice';
import uiReducer from '../features/iu/uiSlice'; // The new slice you created
import searchReducer from '../features/iu/searchSlice';
import selectedNodeReducer from '../features/iu/selectedNodeSlice';
import userDataItemReducer from './../features/data/pwSlice'; // Adjust the path

const store = configureStore({
  reducer: {
    userDataItem: userDataItemReducer,
    treeData: treeDataReducer,
    ui: uiReducer,
    search: searchReducer,
    selectedNode: selectedNodeReducer
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
