import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';


export const makeStore = () => {
    return configureStore({
        reducer: {
            app: appReducer,
        },
        // RTK configure automatiquement les middlewares par défaut de manière optimale
    });
};

// Typages globaux pour TypeScript (très important pour un code propre)
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];