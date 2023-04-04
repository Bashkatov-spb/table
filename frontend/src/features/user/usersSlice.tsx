import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserId, UsersState } from './types/UsersTypes';
import * as api from './api/api';

const initialState: UsersState = {
  users: [],
  error: undefined,
  selectedUser: undefined,
};

export const loadUsers = createAsyncThunk('users/loadUsers', () => api.loadUsers());

export const addNewUser = createAsyncThunk(
  'users/addNewUser',
  (newUser: { name: string; education: string }) => api.addNewUser(newUser)
);

export const removeUser = createAsyncThunk('users/removeUser', (userId: UserId) =>
  api.removeUser(userId)
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  (updatedUser: { id: UserId; name: string; education: string }) => api.updateUser(updatedUser)
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser(state, action) {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.users = [...state.users, action.payload];
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== Number(action.payload));
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? { ...user, name: action.payload.name } : user
        );
      });
  },
});

export const { selectUser } = usersSlice.actions;
export default usersSlice.reducer;
