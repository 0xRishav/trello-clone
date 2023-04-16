import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: localStorage.getItem('localIsAuthenticated') || false,
  userData: localStorage.getItem('localUserData') || null,
  TRELLO_USERS: localStorage.getItem('localTrelloUsers') || [
    { email: 'abc@gmail.com', password: 'Abc456@13' },
  ],
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
    register: (state, action) => {
      state.TRELLO_USERS.push(action.payload);
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, register, setError } = authSlice.actions;
export default authSlice.reducer;
