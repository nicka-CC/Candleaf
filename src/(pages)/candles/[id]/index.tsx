/**
 * @page Candle
 */
'use client';
import {useParams} from "next/navigation";
import {useGetCandleMutation} from "@/src/features/Candles/Api/CandleService";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {candleType} from "@/src/app/types/global";
import {useDispatch, useSelector} from "react-redux";
import styles from "@/src/(pages)/candles/[id]/index.module.css";
import {Button, Checkbox} from "@/src/shared/ui/index";
import {useLazyGetUserCartQuery, useUpdateUserCartMutation} from "@/src/features/Cart/api/CartService";
import {ShoppingCart} from "lucide-react";
import {Selector} from "@/src/shared/ui";
import CandlesSkeletone from "@/src/widgets/candles/CandlesSkeletone";

const Candle = () => {
  const params = useParams();
  const {id} = params;
  const dispatch = useDispatch();
  const [getCandle, {isLoading}] = useGetCandleMutation();
  const [updateUserCart] = useUpdateUserCartMutation();
  const [candle, setCandle] = useState<candleType>();

  let values = [1, 2, 3, 4]
  useEffect(() => {
    if (id) {
      const fetchCandle = async () => {
        try {
          const result = await getCandle(id).unwrap();
          setCandle(result);
        } catch (error) {
          console.error('Failed to fetch candle:', error);
        }
      };

      fetchCandle();
    } else {
      console.error('ID is undefined');
    }
  }, [id, getCandle]);


  const handleAddToCart = async () => {
    if (candle && candle.id) {
      // console.log('Adding to cart:', candle);
      // dispatch(setCart({id: candle.id}));

      try {
        await updateUserCart({id: candle.id}).unwrap();
        console.log('Cart updated successfully');
      } catch (error) {
        console.error('Failed to update cart:', error);
      }
    } else {
      console.error('Candle is undefined or does not have an ID');
    }
  };


  return (

    <div>
      {isLoading && <p><CandlesSkeletone/></p>}
      {candle && (
        <div className={styles.container}>
          <div>
            <Image src={`http://localhost:3555/uploads/${candle.image}`} alt={candle.name} width={540} height={433}/>
            <div className={styles.lefter_text}>All hand-made with natural soy wax, Candleaf is made for your pleasure
              moments.
            </div>
            <div style={{color: "green"}} className={styles.lefter_text}>🚚 FREE SHIPPING</div>
          </div>
          <div className={styles.righter_box}>
            <div className={styles.name}>{candle.name} Candleaf®</div>
            <div className={styles.righter_middle_box}>
              <div className={styles.price}>${candle.price}</div>
              <div>
                <div className={styles.righter_righter_header}><Checkbox/><p>One time purchase</p></div>
                <div className={styles.righter_righter}>
                  <div className={styles.righter_righter_header}><Checkbox/><p>Subscribe and delivery every</p><Selector
                    options={values}/></div>
                  <div className={styles.fonter}>Subscribe now and get the 10% of discount on every recurring order. The
                    discount will be applied
                    at checkout.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.button_container}><Button className={styles.button} theme={'green'}
                                                             onClick={handleAddToCart}><ShoppingCart/> + Add to
              Cart</Button></div>
            <div className={styles.box}>
              <div><b>Wax:</b> {candle.wax}</div>
              <div><b>Fragrance: </b>{candle.fragrance}</div>
              <div className={styles.righter_bottom_box}>
                <div className={styles.bottom_items}><b>BurningTime: </b>{candle.burningTime}</div>
                <div><b>Dimension: </b>{candle.dimension}</div>
                <div><b>Weight: </b>{candle.weight}</div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Candle;
