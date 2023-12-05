// A slice is a portion of the Redux store that is responsible for managing a specific piece of state
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from './store'
import { URL } from '../config'

export interface ScoreType {
  readonly _id: string,
  experience: string,
  user: string,
  score: number
}

export interface ScoreState {
  loading: boolean
  scores: Array<ScoreType>
  error: string | undefined
}

const initialState: ScoreState = {
  scores: [],
  loading: false,
  error: undefined,
}

export const fetchScores = createAsyncThunk(
  'scores/fetchScores',
  async () => {
    const response = await axios.get(`${URL}/admin/scores`)
    return response.data
  },
)

export const scoresSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScores.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchScores.fulfilled, (state, action: PayloadAction<Array<ScoreType>>) => {
        state.loading = false
        state.scores = action.payload
      })
      .addCase(fetchScores.rejected, (state, action) => {
        state.loading = false
        state.scores = []
        state.error = action.error.message
      })
  },
})

export const scoresSelector = (state: RootState) => state.scoresReducer
export default scoresSlice.reducer