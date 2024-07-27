/**
 * @page MediaFiles
 */
'use client';
import { useParams } from "next/navigation";
import { useGetCandleMutation } from "@/src/features/Candles/Api/CandleService";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {candleType} from "@/src/app/types/global";

const Candle = () => {
  const params = useParams();
  const { id } = params;
  const [getCandle, { isLoading }] = useGetCandleMutation();
  const [candle, setCandle] = useState<candleType>();

  useEffect(() => {
    const fetchCandle = async () => {
      try {
        const result = await getCandle(id).unwrap();
        setCandle(result);
      } catch (error) {
        console.error('Failed to fetch candle:', error);
      }
    };

    fetchCandle();
  }, [id, getCandle]);

  return (
    <div>
      gggg {id}
      {isLoading && <p>Loading...</p>}
      {candle && (
        <>
          <p>{candle.name}</p>
          <Image src={`http://localhost:3555/uploads/${candle.image}`} alt={candle.name} width={281} height={210}/>
          <p>{candle.price}$</p>
        </>
      )}
    </div>
  );
};

export default Candle;
