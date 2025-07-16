import { configureStore } from '@reduxjs/toolkit';
import recordsReducer from './records/slice/recordsSlice';

export const store = configureStore({
  reducer: {
    records: recordsReducer,
  },
});
