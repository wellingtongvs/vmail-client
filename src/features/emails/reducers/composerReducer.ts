import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
    composerOpen: boolean;
}

const initialState: State = {
    composerOpen: false,
};

const composerSlice = createSlice({
    name: 'composer',
    initialState,
    reducers: {
        toggleComposer: (state) => {
            state.composerOpen = !state.composerOpen;
        },
        setComposerStatus: (state, action: PayloadAction<boolean>) => {
            state.composerOpen = action.payload;
        },
    },
});

export const { toggleComposer, setComposerStatus } = composerSlice.actions;

export default composerSlice.reducer;
