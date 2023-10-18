import { configureStore } from '@reduxjs/toolkit';
import formGenerator from '@/redux/slices/formSlice';

const store = configureStore({
    reducer: {
        form: formGenerator,
        // Add other reducers here if needed
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
