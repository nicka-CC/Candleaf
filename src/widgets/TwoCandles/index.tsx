'use client';
import React, {useState} from "react";
import {Button} from "@/src/shared/ui/index"
import styles from "@/src/widgets/TwoCandles/index.module.css"
import img from "@/public/twocandles.jpg"
import Image from "next/image";
import {CircleCheck, Frown} from "lucide-react";
const TwoCandles = ({scroll}:any) => {
  const [open, setOpen] =useState<boolean>(false)
  return (
    <div className={styles.body}>
      {open && <div className={styles.modal}>
        <div>Sorry!</div>
        <div>This information havent<Frown/></div>
      </div>}
      <div className={styles.left}>
        <div className={styles.box}>
          <div className={styles.name}>Clean and fragrant soy wax</div>
          <div className={styles.green_text}>Made for your home and for your wellness</div>
          <div className={styles.item}><CircleCheck width={14} height={14}/><b>Eco-sustainable:</b>All recyclable materials, 0% CO2 emissions</div>
          <div className={styles.item}><CircleCheck width={14} height={14}/><b>Hyphoallergenic:</b> 100% natural, human friendly ingredients </div>
          <div className={styles.item}><CircleCheck width={14} height={14}/><b>Handmade:</b> All candles are craftly made with love.</div>
          <div className={styles.item}><CircleCheck width={14} height={14}/><b>Long burning:</b> No more waste. Created for last long.</div>
        </div>
        <div>
          <Button theme={'green'} onClick={()=> setOpen(!open)}>See more</Button>
        </div>
      </div>
      <div>
        <Image src={img} alt={'img'} width={540}/>
      </div>
    </div>
  );
};

export default TwoCandles;
