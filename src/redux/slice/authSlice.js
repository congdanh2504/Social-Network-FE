import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLoginApi, userRegisterApi } from "../../service/Auth";
import { setTokens } from "../../service/common";

const initialState = {
    loading: false,
    isLogin:false,
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
        return Promise.reject(error.response.data)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers:{
        refresh_user(state){
            state.loading = false;
            state.isLogin = false
        },
        refresh_register(state) {
            state.registerError = "";
            state.isRegister = false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getLogin.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(getLogin.fulfilled, (state, action)=>{
            state.loading = false;
            setTokens(action.payload.access_token, action.payload.refresh_token)
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
            state.registerError = action.error.message
        })
    }
})
