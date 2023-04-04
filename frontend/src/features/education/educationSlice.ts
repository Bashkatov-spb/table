import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api/api';
import { Education, EducationState } from './types/EducationTypes';

const initialState: EducationState = {
  educations: [],
  error: undefined,
  selectedEducation: undefined,
};

export const loadEducationTypes = createAsyncThunk('education/loadEducationTypes', () =>
  api.loadEducationTypes()
);

export const addNewEducationType = createAsyncThunk(
  'education/addNewEducationType',
  (education: string) => api.addNewEducationType(education)
);

export const removeEducationType = createAsyncThunk(
  'education/removeEducationType',
  (educationId: number) => api.removeEducationType(educationId)
);

export const updateEducationType = createAsyncThunk(
  'education/updateEducationType',
  (education: Education) => api.updateEducationType(education)
);

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    selectEducation(state, action) {
      state.selectedEducation = action.payload;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEducationTypes.fulfilled, (state, action) => {
        state.educations = action.payload;
      })
      .addCase(loadEducationTypes.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addNewEducationType.fulfilled, (state, action) => {
        state.educations = [...state.educations, action.payload];
      })
      .addCase(addNewEducationType.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeEducationType.fulfilled, (state, action) => {
        if (Number.isNaN(+action.payload)) {
          state.error = `${action.payload}`;
        }
        state.educations = state.educations.filter(
          (education) => education.id !== Number(action.payload)
        );
      })
      .addCase(removeEducationType.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateEducationType.fulfilled, (state, action) => {
        state.educations = state.educations.map((education) =>
          education.id === action.payload.id ? action.payload : education
        );
      })
      .addCase(updateEducationType.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { selectEducation, clearError } = educationSlice.actions;
export default educationSlice.reducer;
