'use client';
import React, {useEffect, useState} from "react";
import styles from "@/src/widgets/testimonials/index.module.css";
import classNames from "@/src/shared/lib/classnames/classnames";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {useGetTestimonialsQuery} from "@/src/features/Testimonials/Api/TestimonialsService";
import Raiting from "@/src/widgets/raiting";
import TestimonialsSkeletone from "@/src/widgets/testimonials/TestimonialsSkeletone";

const Testimonials = ({className}: { className?: string }) => {
  const {data: testimonials, error, isLoading} = useGetTestimonialsQuery({});
  const dispatch = useDispatch();
  let a = [1,2,3]

  return (
    <div className={classNames(styles.container, {}, [className || ""])}>
      <div className={styles.header}>
        <div className={styles.header_top}>Testimonials</div>
        <div className={styles.header_bottom}>Some quotes from our happy customers</div>
      </div>
      <div className={styles.testimonials}>
        {isLoading && a.map((l:any)=> (<p style={{background: "white"}}>
          <TestimonialsSkeletone/>
        </p>))}
        {error && <p>Error loading testimonials</p>}
        {testimonials && testimonials.map((testimonials: any) => (
          <div className={styles.testimonial} key={testimonials.id}>
            <Image src={`http://localhost:3555/uploads/${testimonials.image}`} alt={testimonials.name} width={281}
                   height={210}/>
            <div className={styles.bottom_box}>
              <Raiting raiting={testimonials.raiting} className={styles.content}/>
              <p className={styles.content}>{testimonials.description}</p>
              <p className={styles.name}>{testimonials.name}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Testimonials;