/**
 * @page SignUp
 */
"use client"
import React, { useState } from "react";
import {Input, Button} from "@/src/shared/ui/index"
import Link from "next/link";
import {useLazyRegisterUserQuery} from "@/src/features/Auth/api/AuthService";
import styles from "@/src/(pages)/sign-up/index.module.css";
import {Frown, X} from "lucide-react";

export const SignUp = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [createUser] = useLazyRegisterUserQuery();
  const [errVal, setErrVal] = useState(false)
  const [openModalFst, setOpenModalFst] = useState(false);
  const [openModalSnd, setOpenModalSnd] = useState(false);

  const methodRegisterUser = async () => {
    if (!number || !name || !password) {
      setErrVal(!errVal);
      setOpenModalSnd(!openModalSnd);
    } else {
      try {
        const response = await createUser({ number, name, password }).unwrap();
        window.location.href = '/signin';
      } catch (error) {
        setErrVal(!errVal);
        setOpenModalFst(!openModalFst);
      }
    }
  };

  return (
    <div className={styles.container}>
      {openModalFst &&
        <div className={styles.modal}>
          <div className={styles.modalh}>
            <div  className={styles.modalht}>Error</div>
            <X  onClick={()=> setOpenModalFst(!openModalFst)}/>
          </div>

          <div>Error registration!</div>
          <Frown/>
        </div>
      }
      {openModalSnd &&
        <div className={styles.modal}>
          <div className={styles.modalh}>
            <div className={styles.modalht}>Error</div>
            <X onClick={()=> setOpenModalSnd(!openModalSnd)}/>
          </div>

          <div>You need to enter your number, password and name!</div>
          <Frown/>
        </div>
      }
        <div className={styles.box}>
          <div className={styles.texth}>Registration</div>
          <div className={styles.textb}>If you registration <Link href="/auth/login">click me</Link></div>
          <div>
            Number
            <Input
              name="number"
              placeholder="type youre number"
              value={number}
              error={errVal}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div>
            name
            <Input
              placeholder="name"
              value={name}
              error={errVal}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            Passowrd
            <Input
              placeholder="password"
              value={password}
              error={errVal}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button theme={'green'} onClick={methodRegisterUser}>
              Registrate me
            </Button>
          </div>
        </div>
      </div>
  );
};
