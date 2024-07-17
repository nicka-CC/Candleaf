import {authSlice} from "@/src/features/Auth/model/AuthSlice";
import {authService} from "@/src/features/Auth/api/AuthService";

const reducers = {
  authReducer: authSlice,
  [authService.reducerPath]: authService.reducer
}
export default reducers;