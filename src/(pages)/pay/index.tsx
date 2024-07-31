'use client'
import RightWindow from "@/src/widgets/rightWindow";
import CartPage from "@/src/(pages)/cart";
import styles from "@/src/(pages)/pay/index.module.css"
import DetailWindow from "@/src/widgets/detailWindow";
import {useState} from "react";
import PaymentWindow from "@/src/widgets/paymentWindow";
import SucsessWindow from "@/src/widgets/sucsessWindow";

/**
 * @page Pay
 */
const PayPage = () => {
  const [detail, setDetail] = useState(true);
  const [payment, setPayment] = useState(false)
  const handleNextStep = () => {
    if (detail) {
      setDetail(false);
      setPayment(true);
    } else if (payment) {
      setPayment(false);
    }
  };
  return (
    <div className={styles.container}>
      {detail ?
        <DetailWindow later={handleNextStep}/>
          : payment ? <PaymentWindow later={handleNextStep}/>
            : <SucsessWindow/>}


      <RightWindow/>
  </div>)
};

export default PayPage;
