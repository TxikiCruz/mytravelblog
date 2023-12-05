import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from './store'
import { URL } from '../config'

export interface Comment {
  readonly _id: string,
  user?: string,
  experience: string,
  date: Date,
  content?: string
}

export interface CommentState {
  loading: boolean
  comments: Array<Comment>
  error: string | undefined
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: undefined,
}

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const response = await axios.get(`${URL}/admin/comments`)
    return response.data
  },
)

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Array<Comment>>) => {
        state.loading = false
        state.comments = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.comments = []
        state.error = action.error.message
      })
  },
})

export const commentsSelector = (state: RootState) => state.commentsReducer
export default commentsSlice.reducer