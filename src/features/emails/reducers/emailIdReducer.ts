import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
    id: string | undefined;
}

const initialState: State = {
    id: undefined,
};

const emailIdSlice = createSlice({
    name: 'emailId',
    initialState,
    reducers: {
        setEmailId: (state, action: PayloadAction<string | undefined>) => {
            state.id = action.payload;
        },
    },
});

export const { setEmailId } = emailIdSlice.actions;

export default emailIdSlice.reducer;
