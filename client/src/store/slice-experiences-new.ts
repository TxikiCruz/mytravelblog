import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from './store'
import { URL } from '../config'

export interface Experience {
  _id: string
  user?: string,
  title: string,
  category?: string,
  date: Date,
  year?: number,
  image?: string,
  content?: string,
  score?: number
}

export interface ExperienceState {
  loading: boolean
  experiences: Array<Experience>
  error: string | undefined
}

const initialState: ExperienceState = {
  experiences: [],
  loading: false,
  error: undefined,
}

export const fetchExperiences = createAsyncThunk(
  'experiences/fetchExperiences',
  async () => {
    const response = await axios.get(`${URL}/admin/experiences`)
    return response.data
  },
)

export const experiencesSlice = createSlice({
  name: "experiences",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchExperiences.fulfilled, (state, action: PayloadAction<Array<Experience>>) => {
        state.loading = false
        state.experiences = action.payload
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading = false
        state.experiences = []
        state.error = action.error.message
      })
  },
})

export const experiencesSelector = (state: RootState) => state.experiencesReducer
export default experiencesSlice.reducer