import {authSlice} from "@/src/features/Auth/model/AuthSlice";
import {authService} from "@/src/features/Auth/api/AuthService";
import {candleService} from "@/src/features/Candles/Api/CandleService";
import {testimonialsService} from "@/src/features/Testimonials/Api/TestimonialsService";
import {cartService} from "@/src/features/Cart/api/CartService";
import {cartSlice} from "@/src/features/Cart/model/CartSlice";

const reducers = {
  authReducer: authSlice,
  cartReducer: cartSlice.reducer,
  [authService.reducerPath]: authService.reducer,
  [cartService.reducerPath]: cartService.reducer,
  [testimonialsService.reducerPath]: testimonialsService.reducer,
  [candleService.reducerPath]: candleService.reducer,
}
export default reducers;