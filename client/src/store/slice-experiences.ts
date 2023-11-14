// A slice is a portion of the Redux store that is responsible for managing a specific piece of state
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { URL } from '../config'

export interface Exp {
  user?: string,
  title: string,
  category?: string,
  date?: Date,
  image?: string,
  content?: string,
  score?: number
}

export const fetchExps = createAsyncThunk(
  'exps/fetchExps',
  async () => {
    const response = await axios.get(`${URL}/admin/experiences`)
    return response.data
  },
)

const initialState = {
  exps: [] as Exp[],
  status: 'idle',
  error: null,
}

export const expsSlice = createSlice({
  name: "exps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExps.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchExps.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.exps = action.payload
      })
      .addCase(fetchExps.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const getExps = (state) => state.exps.exps
export const getExpsStatus = (state) => state.exps.status
export const getExpsError = (state) => state.exps.error
export default expsSlice.reducer