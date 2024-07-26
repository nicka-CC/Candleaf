'use client';
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "@/src/shared/ui";
import styles from "@/src/widgets/candles/index.module.css";
import logo from "@/public/footer.svg";
import classNames from "@/src/shared/lib/classnames/classnames";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {useGetCandlesQuery} from "@/src/features/Candles/Api/CandleService";
import CandlesSkeletone from "@/src/widgets/candles/CandlesSkeletone";

const username = "Global_layout";

const Candles = ({className}: { className?: string }) => {
  const {data: candles, error, isLoading} = useGetCandlesQuery({});
  const dispatch = useDispatch();
  let a:number[] = [1,2,3,4,5,6,7,8]

  return (
    <div className={classNames(styles.container, {}, [className || ""])}>
      <div className={styles.header}>
        <div className={styles.header_top}>Products</div>
        <div className={styles.header_bottom}>Order it for you or for your beloved ones </div>
      </div>
      <div className={styles.candles}>
        {isLoading && a.map((l:number,index:number)=> (<p key={index}><CandlesSkeletone/></p>))}
        {error && <p>Error loading candles</p>}
        {candles && candles.map((candle: any) => (
          <div className={styles.candle} key={candle.id}>
            <Image src={`http://localhost:3555/uploads/${candle.image}`} alt={candle.name} width={281} height={210}/>
            <div className={styles.box}>
              <p className={styles.name}>{candle.name}</p>
              <p className={styles.price}>{candle.price}$</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Candles;