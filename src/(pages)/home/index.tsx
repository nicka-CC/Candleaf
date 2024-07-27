'use client'
import Input from "@/src/shared/ui/Input/ui-input";
import styles from "@/src/(pages)/home/index.module.css";
import { Checkbox } from "@/src/shared/ui/index";
import { useEffect, useState } from "react";
import UiButton from "@/src/shared/ui/Button/ui-button";
import {Selector} from "@/src/shared/ui/index"
import {map} from "zod";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Candles from "@/src/widgets/candles";
import Testimonials from "@/src/widgets/testimonials";
import CandlesPopular from "@/src/widgets/candle";

// @ts-ignore
/**
 * @page Home
 */

const HomePage = () => {

  return (
    <div className={styles.container}>
      <Candles/>
      <Testimonials/>
      <CandlesPopular/>
    </div>
  );
};

export default HomePage;