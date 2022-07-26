import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../../service/common";
import { getProfile } from "../../service/userService/userApi";

const initialState = {
    loading: false,
    error: ""
}

export const getUser = createAsyncThunk('user/getUser', async() => {
    try{
        const res = await getProfile();
        console.log(res);
        return res;
    } catch(error){
        return Promise.reject(error)
    }
})

export const userSlide = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUser.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(getUser.fulfilled, (state, action)=>{
            state.loading = false;
            setUser(action.payload);
        })
        builder.addCase(getUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error;
        })
    }
})


