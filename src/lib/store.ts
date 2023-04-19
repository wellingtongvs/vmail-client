import { configureStore } from '@reduxjs/toolkit';
import tabReducer from '../features/emails/reducers/tabReducer';
import composerReducer from '../features/emails/reducers/composerReducer';
import emailIdReducer from '../features/emails/reducers/emailIdReducer';

const store = configureStore({
    reducer: {
        tab: tabReducer,
        composer: composerReducer,
        emailId: emailIdReducer,
    },
});

export default store;
