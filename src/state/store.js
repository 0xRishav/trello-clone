import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth';
import project from './reducers/project';
import workflow from './reducers/workflow';

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: project,
    workflow: workflow,
  },
});

export default store;
