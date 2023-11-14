// A slice is a portion of the Redux store that is responsible for managing a specific piece of state
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import { URL } from '../config'

export interface User {
  email: string,
  password: string,
  role?: string
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await axios.get(`${URL}/admin/users`)
    return response.data
  },
)

const initialState = {
  users: [] as User[],
  status: 'idle',
  error: null,
}

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const getUsers = (state) => state.users.users
export const getUsersStatus = (state) => state.users.status
export const getUsersError = (state) => state.users.error
export default UsersSlice.reducer