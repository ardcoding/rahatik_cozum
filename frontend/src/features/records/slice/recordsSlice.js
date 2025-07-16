import { createSlice } from '@reduxjs/toolkit';
import { groupRecords } from '../../../helpers/groupBy';
import { fetchRecords } from '../asyncThunk/recordsAsync';

const recordsSlice = createSlice({
  name: 'records',
  initialState: {
    groups: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = groupRecords(action.payload);
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recordsSlice.reducer;
