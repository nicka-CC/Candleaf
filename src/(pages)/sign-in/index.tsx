/**
 * @page SignIn
 */
"use client"
import React, {Provider, useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {Input, Button} from "@/src/shared/ui/index"
import Link from "next/link";
import {useLazyLoginUserQuery} from "@/src/features/Auth/api/AuthService";
import {setToken, setUser} from "@/src/features/Auth/model/AuthSlice";
import styles from "@/src/(pages)/sign-in/index.module.css"
import {Frown, X} from "lucide-react";

const SignIn = () => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser] = useLazyLoginUserQuery();
  const dispatch = useDispatch();
  const [errVal, setErrVal] = useState(false)
  const [openModalFst, setOpenModalFst] = useState(false);
  const [openModalSnd, setOpenModalSnd] = useState(false);
  const methodLoginUser = () => {
    if (!number || !password) {
      setErrVal(!errVal);
      setOpenModalSnd(!openModalSnd);
    } else {
      loginUser({ number, password })
        .unwrap()
        .then((res) => {
          if (res?.ok) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));
            dispatch(setUser({ user: res.user }));
            dispatch(setToken({ token: res.token }));
            window.location.href = '/';
          } else{
            setErrVal(!errVal);
            setOpenModalFst(!openModalFst);
          }
        })
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

        <div>You password or number incorrect!</div>
        <Frown/>
      </div>
      }
      {openModalSnd &&
        <div className={styles.modal}>
          <div className={styles.modalh}>
            <div className={styles.modalht}>Error</div>
            <X onClick={()=> setOpenModalSnd(!openModalSnd)}/>
          </div>

          <div>You need to enter both your number and password!</div>
          <Frown/>
        </div>
      }
        <div
          className={styles.box}
        >
          <div className={styles.texth}>Authorization</div>
          <div className={styles.textb}>
              <h1>if you havent account </h1><Link href="/signup">click here</Link><h1>.</h1>
          </div>
          <div>
            Number
            <Input
              name="number"
              error={errVal}
              placeholder="type youre telephone number"
              value={number}
              onChange={(el) => setNumber(el.target.value)}
            />
          </div>
          <div>
            Password
            <Input
              placeholder="password"
              error={errVal}
              value={password}
              onChange={(el) => setPassword(el.target.value)}
            />
          </div>
          <div className={styles.button}>
            <Button theme={"green"} title="login" onClick={methodLoginUser}>
              Login
            </Button>
          </div>
        </div>
      </div>
  );
};
export default SignIn;