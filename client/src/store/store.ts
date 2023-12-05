import { configureStore } from "@reduxjs/toolkit"
//import { useDispatch } from 'react-redux'
import catsReducer from "./slice-categories"
import experiencesReducer from "./slice-experiences"
import scoresReducer from "./slice-scores"
import commentsReducer from "./slice-comments"
import usersReducer from "./slice-users"

export const store = configureStore({
  reducer: {
    catsReducer,
    experiencesReducer,
    scoresReducer,
    commentsReducer,
    usersReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
//export const useAppDispatch: () => AppDispatch = useDispatch
