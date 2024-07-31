'use client';
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Button, Input} from "@/src/shared/ui";
import styles from "@/src/widgets/rightWindow/index.module.css";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {candleType} from "@/src/app/types/global";
import {useDeleteCandleInUserCartMutation, useLazyGetUserCartQuery} from "@/src/features/Cart/api/CartService";
import {setCart} from "@/src/features/Cart/model/CartSlice";
import {RootState} from "@/src/app/store";


const RightWindow = ({className}: { className?: string }) => {
  const dispatch = useDispatch();
  const [triggerGetUserCart] = useLazyGetUserCartQuery();
  const [triggerDeleteUserCart] = useDeleteCandleInUserCartMutation();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // @ts-ignore
        const result = await triggerGetUserCart().unwrap();
        console.log('Fetched cart items from backend:', result);

        const cartItems:candleType[] = result.candles.map((item: any) => ({
          id: item.id,
          name: item.candle.name,
          price: item.candle.price,
          image: item.candle.image,
        }));

        dispatch(setCart(cartItems));
      } catch (error) {
        console.error('Failed to fetch cart items from backend:', error);
      }
    };

    fetchCartItems();
  }, [dispatch, triggerGetUserCart]);
  const deleteItem = async (id: number) => {
    console.log('Deleting item with ID:', id); // Отладочное сообщение
    try {
      await triggerDeleteUserCart({id}).unwrap();
      // Обновите корзину после удаления
      // @ts-ignore
      const result = await triggerGetUserCart().unwrap();
      const updatedCartItems: candleType[] = result.candles.map((item: any) => ({
        id: item.id,
        name: item.candle.name,
        price: item.candle.price,
        image: item.candle.image,
      }));
      dispatch(setCart(updatedCartItems));
    } catch (error) {
      console.error('Failed to delete candle:', error);
    }
  };



  const cartItems = useSelector((state: RootState) => state.cartReducer.items);

  useEffect(() => {
    console.log('Cart items:', cartItems);
  }, [cartItems]);
  const calculateTotalPrice = () => {
    return cartItems.reduce((total: any, item: { price: any; }) => total + (item.price || 0), 0);
  };
  return (
    <div className={styles.container}>

      {cartItems.map((item: any, index: number) => (
        <div key={index}>
          <div className={styles.box}>
            <Image
              src={`http://localhost:3555/uploads/${item.image}`}
              alt={item.name}
              width={160}
              height={120}
            />
            <div>
              <div className={styles.names}>{item.name} Candleaf®</div>
              <div className={styles.green_text}>${item.price}</div>
            </div>

          </div>


        </div>
      ))}
      <div className={styles.promocode}>
        <Input></Input><Button theme={'gray'} style={{width: "216px"}}>Add code</Button>
      </div>
      <div className={styles.bottom_box}>
        <div className={styles.bottom_string}>
          <div style={{marginRight: "auto"}}>Sub-total:</div>
          <div>${calculateTotalPrice()}</div>
        </div>
        <div className={styles.bottom_string}>
          <div style={{marginRight: "auto"}}>Shipping:</div>
          <div>Calculated at the next step</div>
        </div>
      </div>
      <div className={styles.bottom_string}>
        <div style={{marginRight: "auto"}}>Total:</div>
        <div>${calculateTotalPrice()}</div>
      </div>

    </div>
  )
    ;
};

export default RightWindow;