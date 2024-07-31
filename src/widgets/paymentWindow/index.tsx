'use client';
import React, {useEffect, useState} from "react";


import {Button, Checkbox, Input, Selector} from "@/src/shared/ui";
import styles from "@/src/widgets/paymentWindow/index.module.css";
import {ChevronRight, CreditCard} from "lucide-react";

let values: string[] = ['Province', 'City']
let values2: string[] = ['Italy', 'France', 'USA']

const PaymentWindow = ({className, later}: { className?: string, later?: any }) => {
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <div className={styles.text_green}>Cart</div>
        <ChevronRight size={16}/>
        <div className={styles.text_green}> Details</div>
        <ChevronRight size={16}/>
        <div className={styles.text_bold}> Payment</div>
      </div>

      <div className={styles.contact}>
        <div className={styles.name}>Payment method</div>
        <div className={styles.payment}>
          <div className={styles.header}><CreditCard size={31}/>Credit Card</div>
          <div className={styles.card}>
            <Input placeholder={'Card Number'}/>
            <Input placeholder={'Holder Name'}/>
            <div className={styles.flex}>
              <Input placeholder={'Expiration (MM/YY)'}/>
              <Input placeholder={'CVV'}/>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.name}>Tax Informations</div>
        <Input placeholder={'VAT number  (optional)'}/>
        <Input placeholder={'PEC (optional)'}/>

      </div>

      <div className={styles.contact}>
        <div className={styles.name}>Billing address</div>
        <div className={styles.checkbox}>
          <Checkbox/>
          Same as the shipping address
        </div>
        <div className={styles.checkbox}>
          <Checkbox/>
          Use a different address for billing
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

export default PaymentWindow;