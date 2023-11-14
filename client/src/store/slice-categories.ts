// A slice is a portion of the Redux store that is responsible for managing a specific piece of state
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from './store'
import { URL } from '../config'

export interface Cat {
  readonly _id: string,
  name: string,
  continent?: string
}

export interface CatState {
  loading: boolean
  cats: Array<Cat>
  error: string | undefined
}

const initialState: CatState = {
  cats: [],
  loading: false,
  //status: 'idle',
  error: undefined,
}

export const fetchCats = createAsyncThunk(
  'cats/fetchCats',
  async () => {
    const response = await axios.get(`${URL}/admin/categories`)
    return response.data
  },
)

export const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        //state.status = 'loading'
        state.loading = true
      })
      .addCase(fetchCats.fulfilled, (state, action: PayloadAction<Array<Cat>>) => {
        //state.status = 'succeeded'
        state.loading = false
        state.cats = action.payload
      })
      .addCase(fetchCats.rejected, (state, action) => {
        //state.status = 'failed'
        state.loading = false
        state.cats = []
        state.error = action.error.message
      })
  },
})

//export const getCats = (state) => state.cats.cats
//export const getCatsStatus = (state) => state.cats.status
//export const getCatsError = (state) => state.cats.error
export const catsSelector = (state: RootState) => state.catsReducer
export default catsSlice.reducer