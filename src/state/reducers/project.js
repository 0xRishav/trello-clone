import { createSlice } from '@reduxjs/toolkit';
import nextId from 'react-id-generator';

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action) => {
      const obj = {
        id: state.projects.length + 1,
        title: action.payload.title,
        description: action.payload.description,
        imageUrl: 'https://via.placeholder.com/300x200',
      };
      state.projects.push(obj);
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
  },
});

export const { addProject } = projectSlice.actions;
export default projectSlice.reducer;
