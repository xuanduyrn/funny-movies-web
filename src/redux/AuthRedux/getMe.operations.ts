import { createAsyncThunk } from '@reduxjs/toolkit';
import * as AuthApis from '../../api/auth';

const getMe: any = createAsyncThunk(
  'auth/getMe',
  async (__, { rejectWithValue }) => {
    try {
      const response = await AuthApis.getMe();
      return response?.data;
    } catch (err: any) {
      if (!err) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);

export default getMe;
