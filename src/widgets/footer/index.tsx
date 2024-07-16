'use client'
import React, {useState} from "react";
import Link from "next/link";
import {Button} from "@/src/shared/ui";
import styles from "@/src/widgets/footer/index.module.css";
import logo from "@/public/footer.svg"

import classNames from "@/src/shared/lib/classnames/classnames";
import Image from "next/image";
import {Frown} from "lucide-react";
const username = "Global_layout";
const Footer = ({className}: { className?: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const opened = () => {
    setOpen(!open);
    setTimeout(() => {
      setOpen(open => !open);
    }, 1000000);
  };
  return (
    <div className={classNames(styles.footer, {}, [className || ""])}>
      {open &&
        <div className={styles.sorry}>
          <div className={styles.sorryes}>
            <div style={{fontSize:"64px"}}>Sorry</div>
            <div className={styles.fw}>This page are not developed...</div>
            <Frown size={32}/>
          </div>
        </div>
      }
        <div className={styles.container}>
          <div className={styles.left}>
            <Image src={logo} alt={"candleaf"}/>
            <div className={styles.text}>Your natural candle made for your home and for your wellness.</div>
          </div>
          <div className={styles.right}>
            <div className={styles.right1st}>
              <Button className={styles.right2st}>Discovery</Button>
              <Button theme={'text-r'} onClick={opened} className={styles.right2st}>New Season</Button>
              <Button theme={'text-r'} onClick={opened} className={styles.right2st}>Most Searches</Button>
              <Button theme={'text-r'} onClick={opened} className={styles.right2st}>Most Sallied</Button>
            </div>
            <div className={styles.right1st}>
              <Link href={"/about"}>
                <Button className={styles.right2st}>About</Button>
              </Link>
              <Link href={"/help"}>
                <Button theme={'text-r'} className={styles.right2st}>Help</Button>
              </Link>

              <Button theme={'text-r'} onClick={opened}  className={styles.right2st}>Shipping</Button>
              <Button theme={'text-r'} onClick={opened}  className={styles.right2st}>Affiliate</Button>
            </div>
            <div className={styles.right1st}>
              <Link href={"/info"}>
                <Button className={styles.right2st}>Info</Button>
              </Link>
              <Link href={"/cotact_us"}>
                <Button theme={'text-r'} className={styles.right2st}>Contact us</Button>
              </Link>
              <Button theme={'text-r'} onClick={opened} className={styles.right2st}>Privacy Policies</Button>
              <Button theme={'text-r'} onClick={opened} className={styles.right2st}>Terms & Conditions</Button>
            </div>
          </div>
        </div>

    </div>
  );
};

export default Footer;
