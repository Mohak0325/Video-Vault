import { createSlice } from '@reduxjs/toolkit';


const videoSlice = createSlice({
    name: 'video' ,
    initialState : [] ,
    reducers: {
        setVideos: (state, action) => {
        return action.payload; // Set the full video list
        },
        addVideo: (state, action) => {
        state.push(action.payload); // Add a new video
        },
        removeVideo: (state, action) => {
        return state.filter(video => video.id !== action.payload); // Remove by ID
        },

    }
});

export default videoSlice.reducer;
export const {addVideo , removeVideo , setVideos} = videoSlice.actions;