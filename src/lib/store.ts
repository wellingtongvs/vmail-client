import { configureStore } from '@reduxjs/toolkit';
import tabReducer from '../features/emails/reducers/tabReducer';
import composerReducer from '../features/emails/reducers/composerReducer';
import emailIdReducer from '../features/emails/reducers/emailIdReducer';
import userReducer from '../features/authentication/reducers/userReducer';
import loadingReducer from '../reducers/loadingReducer';

const store = configureStore({
    reducer: {
        tab: tabReducer,
        composer: composerReducer,
        emailId: emailIdReducer,
        user: userReducer,
        loading: loadingReducer,
    },
});

export default store;
