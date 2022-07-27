import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../../service/common";
import { getProfile, createPost } from "../../service/userService/userApi";

const initialState = {
    loading: false,
    error: "",
    isPostSuccess: false
}

export const getUser = createAsyncThunk('user/getUser', async() => {
    try{
        const res = await getProfile();
        return res;
    } catch(error){
        return Promise.reject(error)
    }
})

export const createPostAction = createAsyncThunk('user/post', async({post, selectedFiles}) => {
    try{
        const res = await createPost(post, selectedFiles);
        return res;
    } catch(error){
        return Promise.reject(error)
    }
})

export const userSlide = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        refresh_state(state) {
            state.loading= false;
            state.error = "";
            state.isPostSuccess = false;
        }
    },
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
        builder.addCase(createPostAction.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(createPostAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.isPostSuccess = true;
        })
        builder.addCase(createPostAction.rejected, (state, action)=>{
            state.loading = false;
            state.isPostSuccess = false;
            state.error = action.error;
        })
    }
})


