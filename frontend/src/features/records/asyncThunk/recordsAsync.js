import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecords = createAsyncThunk(
  'records/fetchRecords',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/records');
      console.log(response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);