import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
    userId: string | undefined;
    userEmail: string | undefined;
    token: string | undefined;
}

const initialState: State = {
    userId: undefined,
    userEmail: undefined,
    token: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (
            state,
            action: PayloadAction<{
                userId: string | undefined;
                userEmail: string | undefined;
                token: string | undefined;
            }>
        ) => {
            state.userEmail = action.payload.userEmail;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
    },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
