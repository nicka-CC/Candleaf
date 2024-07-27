'use client';
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "@/src/shared/ui";
import styles from "@/src/widgets/candle/index.module.css";
import logo from "@/public/footer.svg";
import classNames from "@/src/shared/lib/classnames/classnames";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {useGetCandleMutation, useGetCandlesQuery} from "@/src/features/Candles/Api/CandleService";
import CandlesSkeletone from "@/src/widgets/candles/CandlesSkeletone";
import {candleType} from "@/src/app/types/global";


const CandlesPopular = ({className}: { className?: string }) => {
  const [getCandle] = useGetCandleMutation();
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [candlePopular, setCandlePopular] = useState<candleType[]>([]);
  const dispatch = useDispatch();
  let ids: number[] = [2, 5, 6, 8];
  let a:number[] = [1,2,3,4];


  useEffect(() => {
    const fetchCandles = async () => {
      try {
        const results = await Promise.all(ids.map(id => getCandle(id).unwrap()));
        setCandlePopular(results);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch candles:', error);
        setIsError(true);
      }
    };

    fetchCandles();
  }, [getCandle]);
  return (
    <div className={classNames(styles.container, {}, [className || ""])}>
      <div className={styles.header}>
        <div className={styles.header_top}>Popular</div>
        <div className={styles.header_bottom}>Our top selling product that you may like</div>
      </div>
      <div className={styles.candles}>
        {isLoading && a.map((id:number,index:number)=> (<p key={index}><CandlesSkeletone/></p>))}
        {isError && <p>Error loading candles</p>}
        {candlePopular && candlePopular.map((candle: any) => (
          <div className={styles.candle} key={candle.id}>
            <Link href={`/candle/${candle.id}`}>
            <Image src={`http://localhost:3555/uploads/${candle.image}`} alt={candle.name} width={281} height={210}/>
            <div className={styles.box}>
              <p className={styles.name}>{candle.name}</p>
              <p className={styles.price}>{candle.price}$</p>
            </div>
          </Link>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CandlesPopular;