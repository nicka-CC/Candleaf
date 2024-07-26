import {authSlice} from "@/src/features/Auth/model/AuthSlice";
import {authService} from "@/src/features/Auth/api/AuthService";
import {candleService} from "@/src/features/Candles/Api/CandleService";
import {testimonialsService} from "@/src/features/Testimonials/Api/TestimonialsService";

const reducers = {
  authReducer: authSlice,
  [authService.reducerPath]: authService.reducer,
  [testimonialsService.reducerPath]: testimonialsService.reducer,
  [candleService.reducerPath]: candleService.reducer,
}
export default reducers;