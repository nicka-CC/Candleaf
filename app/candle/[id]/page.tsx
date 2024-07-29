'use client'
import Candle from "src/(pages)/candles/[id]"
// @ts-ignore
import {Provider} from "react-redux";
import {store} from "@/src/app/store";
const Candles = ()=>{
  return(
    <Provider store={store}>
    <Candle/>
    </Provider>
  )
}
export default Candles;
