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
    },
});

export const { toggleComposer } = composerSlice.actions;

export default composerSlice.reducer;
