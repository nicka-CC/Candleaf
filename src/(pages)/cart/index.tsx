/**
 * @page Cart
 */
'use client'
import { useGetCandleMutation } from "@/src/features/Candles/Api/CandleService";
import React, { useEffect } from "react";
import {Button} from "@/src/shared/ui/index"
import Image from "next/image";
import styles from "@/src/(pages)/cart/index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/app/store";
import {useDeleteCandleInUserCartMutation, useLazyGetUserCartQuery} from "@/src/features/Cart/api/CartService";
import { setCart } from "@/src/features/Cart/model/CartSlice";
import {candleType} from "@/src/app/types/global";

const CartPage = () => {
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
      <div className={styles.name}>Your cart items</div>
      <div className={styles.undername}>
        <Button theme={'text-underline'}>Back to shopping</Button>
      </div>
      <table className={styles.cartTable}>
        <thead className={styles.tr}>
        <tr>
            <th style={{textAlign: "left"}}>Product</th>
            <th></th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {cartItems.map((item:any, index:number) => (
          <tr key={index}>
            <td>
              <Image
                src={`http://localhost:3555/uploads/${item.image}`}
                alt={item.name}
                width={160}
                height={120}
                style={{padding: "32px 0"}}
              />
            </td>
            <td className={styles.names}>{item.name} Candleaf®<Button theme={'text-underline'} onClick={() => deleteItem(item.id)}>
              Delete
            </Button></td>
            <td style={{textAlign: "center"}}>{item.price}$</td>
          </tr>
        ))}
        <tr>
          <td colSpan={1}></td>
          <td className={styles.bottom}>
            <div>Sub-total: ${calculateTotalPrice()}</div>
            <div style={{fontWeight: "200"}}>Tax and shipping cost will be calculated later</div>
          </td>
          <td colSpan={1} style={{display: "flex", justifyContent: "center"}}>
            <Button theme={'green'}>Check-out</Button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
