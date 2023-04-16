import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth';
import project from './reducers/project';

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: project,
  },
});

export default store;
