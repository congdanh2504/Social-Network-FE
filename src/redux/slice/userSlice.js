import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
}

const getUser = createAsyncThunk('user/getUser',()=>{

})

export const userSlide = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase()
    }
})


