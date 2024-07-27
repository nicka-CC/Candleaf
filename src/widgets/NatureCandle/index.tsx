'use client';
import React from "react";
import {Button} from "@/src/shared/ui/index"
import styles from "@/src/widgets/NatureCandle/index.module.css"
import img from "@/public/NatureCandle.jpg"
const NatureCandle = ({scroll}:any) => {

  return (
    <div
      style={{
        backgroundImage: `url(${img.src})`,
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className={styles.container}>
        <div className={styles.header}>🌱</div>
        <div className={styles.header}>The nature candle</div>
        <div>All handmade with natural soy wax, Candleaf is a companion for all your pleasure moments</div>
        <div className={styles.button}><Button theme={"green"} className={styles.buttons} onClick={scroll}>Discovery our collection</Button></div>
      </div>
    </div>
  );
};

export default NatureCandle;
