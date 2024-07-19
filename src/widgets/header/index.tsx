'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "@/src/shared/ui";
import styles from "@/src/widgets/header/index.module.css";
import logo from "@/public/logo.svg"

import classNames from "@/src/shared/lib/classnames/classnames";
import Image from "next/image";
import {AlignJustify, ChevronDown, PersonStanding, ShoppingCart, UserRound} from "lucide-react";

const getLocalStorageItems = (key: any) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};
const username = "Global_layout";
const Header = ({className}: { className?: string }) => {
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string | null>(null)
  const [person, setPerson] = useState<boolean>(false)
  useEffect(()=>{
    const userData = getLocalStorageItems("user")
    const userToken = getLocalStorageItems("token")
    if(userData){
      setUser(JSON.parse(userData))
    }
    if(userToken){
      setToken(userToken)
    }
  },[])
  if (person && !token){
    window.location.href = "/signin";
  }
  const [open , setOpen] = React.useState(false);
  return (
    <div className={classNames(styles.header, {}, [className || ""])}>
      <div className={styles.buttonm} >
        <AlignJustify onClick={() => {setOpen(!open);}}/>
      </div>

      <Link href="/">
        <Image className={styles.image} src={logo} alt={"candleaf"}/>
      </Link>
      <div className={styles.middle}>
        <Button className={styles.button} theme={"text-hp"}>
          Discovery
          <ChevronDown/>
        </Button>
        <Link href="/about">
          <Button theme={"text-hp"} className={styles.button}>
            About
          </Button>
        </Link>
        <Link href="/contact_us">
          <Button theme={"text-hp"} className={styles.button}>
            Contact us
          </Button>
        </Link>
      </div>
      <div className={styles.end}>
          <Button theme={"text-h"} onClick={()=> setPerson(!person)} className={styles.button}>
            <UserRound/>
          </Button>
        <Link href="/cart">
          <Button theme={"text-h"} className={styles.button}>
            <ShoppingCart/>
          </Button>
        </Link>
      </div>
      {person && token &&
        <div className={styles.profile}>
          <div>Youre name: {user.name}</div>
          <div>Youre number: {user.number}</div>
          <Button theme={"gray"} onClick={()=> {
            {localStorage.clear();
              window.location.href = "/signin";
            }}}>Log out</Button>
         </div>
      }
      {open &&
        <div className={styles.middle_open}>
          <Button className={styles.button} theme={"text-hpm"}>
            Discovery
            <ChevronDown size={36}/>
          </Button>
          <Link href="/about">
            <Button theme={"text-hpm"} className={styles.button}>
              About
            </Button>
          </Link>
          <Link href="/contact_us">
            <Button theme={"text-hpm"} className={styles.button}>
              Contact us
            </Button>
          </Link>
        </div>
      }
    </div>
  );
};

export default Header;
