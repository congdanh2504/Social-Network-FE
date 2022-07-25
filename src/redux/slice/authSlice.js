import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLoginApi, userRegisterApi } from "../../service/Auth";

const initialState = {
    loading: false,
    isLogin:false,
    access_token:"",
    refresh_token:"",
    loginError:"",
    registerError:"",
    isRegister:false
}

export const getLogin = createAsyncThunk('auth/getUser', async (data)=>{
    try{
        const res = await userLoginApi(data);
        return res;
    } catch(error){
        return Promise.reject(error)
    }
})

export const register = createAsyncThunk('/auth/register', async (data)=>{
    try{
        const res = await userRegisterApi(data);
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
            state.loginError = action.error
        })
        builder.addCase(register.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(register.fulfilled, (state, action)=>{
            state.loading = false;
            state.isRegister = true
        })
        builder.addCase(register.rejected, (state, action)=>{
            state.loading = false;
            state.registerError = action.error
        })
    }
})
