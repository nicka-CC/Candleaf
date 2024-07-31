'use client';
import React, {useEffect, useState} from "react";;
import {Button, Input} from "@/src/shared/ui";
import styles from "@/src/widgets/sucsessWindow/index.module.css";
import {CircleCheck} from "lucide-react";


const SucsessWindow = ({className}: { className?: string }) => {
  return (
    <div className={styles.container}>
      <div><CircleCheck size={100} color={'#4d9c6f'}/></div>
      <div className={styles.name}>Payment Confirmed</div>
      <div style={{color: "#4d9c6f"}}>ORDER #{Math.floor(Math.random() * 10000)}</div>
      <div> Thank you Joe for buying Candleaf. The nature is grateful to you. Now that your order is confirmed it will be ready to ship in 2 days. Please check your inbox in the future for your order updates.</div>
      <div className={styles.button}><Button theme={'green'} onClick={()=> {window.location.href ="/"}}>Back to shopping</Button></div>
    </div>
  )
    ;
};

export default SucsessWindow;