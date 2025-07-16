import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecords = createAsyncThunk(
  'records/fetchRecords',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://rahatikcozum-6acawh9ol-ardcodings-projects.vercel.app/api/records/');
      console.log(response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);