import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabValue } from '../types/TabValue';

interface State {
    activeTab: TabValue;
}

const initialState: State = {
    activeTab: TabValue.INBOX,
};

const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<TabValue>) => {
            state.activeTab = action.payload;
        },
    },
});

export const { setActiveTab } = tabSlice.actions;

export default tabSlice.reducer;
