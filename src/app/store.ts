import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reducers from "@/src/features/reducer";
import {authService} from "@/src/features/Auth/api/AuthService";



console.log("🚀 ~ reducers:", reducers);

const rootReducer = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authService.middleware
    ),
});
