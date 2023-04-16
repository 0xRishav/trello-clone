import { createSlice } from '@reduxjs/toolkit';
import nextId from 'react-id-generator';

const initialState = {
  workflows: [
    {
      id: 1,
      title: 'To Do',
      tasks: [],
    },
    {
      id: 2,
      title: 'In Progress',
      tasks: [],
    },
    {
      id: 3,
      title: 'Done',
      tasks: [],
    },
  ],
};

const WorkflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { workflowId, task } = action.payload;
      const workflow = state.workflows.find(
        (workflow) => workflow.id == workflowId
      );
      workflow.tasks.push({ id: workflow.tasks.length + 1, ...task });
    },
    setWorkFlow: (state, action) => {
      state.workflows = action.payload.workflows;
    },
  },
});

export const { addTask, setWorkFlow } = WorkflowSlice.actions;
export default WorkflowSlice.reducer;
