import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/authSlice";
import videoReducer from "./slice/videoSlice";

const store = configureStore({
    reducer: {
        user : userReducer ,
        video : videoReducer
    }
})

export default store;