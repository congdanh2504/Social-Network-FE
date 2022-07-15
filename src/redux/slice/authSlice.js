import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLoginApi } from "../../service/Auth";

const initialState = {
    loading: false,
    isLogin:false,
    access_token:"",
    refresh_token:"",
    error:""
}

export const getLogin = createAsyncThunk('auth/getUser', async (data)=>{
    try{
        const res = await userLoginApi(data);
        return res;
    } catch(error){
        return Promise.reject(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers:{
        refresh_user(state){
           state.loading = false;
           state.access_token = "";
           state.refresh_token = ""
           state.isLogin = false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getLogin.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(getLogin.fulfilled, (state, action)=>{
            state.loading = false;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.isLogin = true
        })
        builder.addCase(getLogin.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error
        })
    }
})
