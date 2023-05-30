import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: null,
    userLoading: false
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUserLoading: (state, action) => {
            state.userLoading = action.payload
        },
    }
})


export default userSlice.reducer

export const { setUser, setUserLoading } = userSlice.actions