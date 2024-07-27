'use client'
import styles from "@/src/(pages)/home/index.module.css";
import {useRef} from "react";
import Candles from "@/src/widgets/candles";
import Testimonials from "@/src/widgets/testimonials";
import CandlesPopular from "@/src/widgets/candle";
import NatureCandle from "@/src/widgets/NatureCandle";
import TwoCandles from "@/src/widgets/TwoCandles";
/**
 * @page Home
 */

const HomePage = () => {
  const currentRef = useRef<HTMLDivElement>(null);
  const scrollDown = ()=> {
    console.log("scrollToContent called");
    if (currentRef.current) {
      console.log("Scrolling to target element");
      currentRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("targetRef.current is null");
    }
  }
  return (
    <div className={styles.container}>
      <NatureCandle scroll={scrollDown}/>
      <Candles ref={currentRef}/>
      <TwoCandles/>
      <Testimonials/>
      <CandlesPopular/>
    </div>
  );
};

export default HomePage;