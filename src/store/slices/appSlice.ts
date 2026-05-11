import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Définir le type de notre état
interface AppState {
    isInitialized: boolean;
    // Vous pourrez ajouter d'autres états globaux ici plus tard (ex: userToken, etc.)
}

// Définir l'état initial
const initialState: AppState = {
    isInitialized: false,
};

// Créer le slice avec RTK
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // Action pour modifier l'état
        setInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload;
        },
    },
});

// Exporter l'action pour pouvoir l'utiliser dans les composants
export const { setInitialized } = appSlice.actions;

// Exporter le reducer pour le store
export default appSlice.reducer;