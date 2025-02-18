import { configureStore } from '@reduxjs/toolkit';
import Slicedata from '../Redux/Slice'

export const store = configureStore({
  reducer: {
    Subject: Slicedata,
  },
});

export default store;
