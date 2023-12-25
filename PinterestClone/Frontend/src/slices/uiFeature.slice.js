import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isLogin: false,
    // setting_click : false, 
    message_click: false,
    notification_click: false,
    appearance: true
}


const uiFeature = createSlice({
    name: 'uiFeature',
    initialState,
    reducers: {
        loginReduc: (state, action) => {
            state.isLogin = action.payload
        },
        apperanceReduc: (state, action) => {
            state.appearance = action.payload
        }
    }
})


export default uiFeature.reducer
export const { loginReduc, apperanceReduc } = uiFeature.actions;