// A slice is a portion of the Redux store that is responsible for managing a specific piece of state
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from './store'
import { URL } from '../config'

export interface UserType {
  readonly _id: string,
  email: string,
  password: string,
  role?: string
}

export interface UserState {
  loading: boolean
  users: Array<UserType>
  error: string | undefined
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: undefined,
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await axios.get(`${URL}/admin/users`)
    return response.data
  },
)

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        //state.status = 'loading'
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<Array<UserType>>) => {
        //state.status = 'succeeded'
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        //state.status = 'failed'
        state.loading = false
        state.users = []
        state.error = action.error.message
      })
  },
})

export const usersSelector = (state: RootState) => state.usersReducer
export default usersSlice.reducer