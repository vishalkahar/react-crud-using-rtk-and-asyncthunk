import { configureStore } from "@reduxjs/toolkit"
import userDetails from "../features/userDetailSlice"

export const store = configureStore({
    reducer: {
        app: userDetails
    }
})