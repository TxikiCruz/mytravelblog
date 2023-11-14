import { configureStore } from "@reduxjs/toolkit"
//import { useDispatch } from 'react-redux'
import usersSlice from "./slice-users"
import catsReducer from "./slice-categories"
import expsSlice from "./slice-experiences"
import experiencesReducer from "./slice-experiences-new"
import scoresReducer from "./slice-scores"

export const store = configureStore({
  reducer: {
    catsReducer,
    experiencesReducer,
    users: usersSlice,
    exps: expsSlice,
    scoresReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
//export const useAppDispatch: () => AppDispatch = useDispatch
