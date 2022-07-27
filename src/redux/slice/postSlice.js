import { getPosts } from "../../service/postService/postApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: "",
    posts: ""
}

export const getPostsAction =  createAsyncThunk('post/getPosts', async() => {
    try{
        const res = await getPosts();
        return res;
    } catch(error){
        return Promise.reject(error)
    }
})

export const postSlide = createSlice({
    name: 'post',
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getPostsAction.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(getPostsAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.posts = action.payload;
        })
        builder.addCase(getPostsAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error;
        })
    }
})


