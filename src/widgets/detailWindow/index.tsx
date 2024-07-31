'use client';
import React, {useEffect, useState} from "react";

;
import {Button, Input, Checkbox, Selector} from "@/src/shared/ui";
import styles from "@/src/widgets/detailWindow/index.module.css";
import {ChevronRight} from "lucide-react";

let values: string[] = ['Province', 'City']
let values2: string[] = ['Italy', 'France', 'USA']

const DetailWindow = ({className, later}: { className?: string, later?: any }) => {
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <div className={styles.text_green}>Cart</div>
        <ChevronRight size={16}/>
        <div className={styles.text_bold}> Details</div>
        <ChevronRight size={16}/>
        <div> Payment</div>
      </div>
      <div className={styles.contact}>
        <div>Contact</div>
        <Input placeholder={'Email or mobile phone number'}/>
        <div className={styles.checkbox}>
          <Checkbox/>
          Add me to Candleaf newsletter for a 10% discount
        </div>
      </div>
      <div className={styles.address}>
        <div>Shipping Address</div>
        <div className={styles.flex}>
          <Input placeholder={'Name'}/>
          <Input placeholder={'Second Name'}/>
        </div>
        <Input placeholder={'Address and number'}/>
        <Input placeholder={'Shipping note (optional)'}/>
        <div className={styles.flex}>
          <Input placeholder={'City'}/>
          <Input placeholder={'Postal Code'}/>
          <Selector options={values}/>
        </div>
        <div className={styles.checkbox}>
          <Selector options={values2}/>
          <Checkbox/>
          Save this informations for a future fast checkout
        </div>
      </div>
      <div className={styles.flex}>
        <Button style={{marginRight: "auto"}} theme={'text-underline'} onClick={() => {
          {
            window.location.href = "/cart";
          }
        }}>Back to cart</Button>
        <Button theme={'green'} onClick={later}>Go to shipping</Button>
      </div>
    </div>
  );
};

export default DetailWindow;