import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name : "user" ,
    initialState : null ,
    reducers : {
        addUser : (state , action) => {
            return action.payload;
        } ,
        removeUser : (state) => {
            return null;
        }
    }
});

export default authSlice.reducer;
export const {addUser , removeUser} = authSlice.actions;