import React from "react";
import styles from "@/src/shared/ui/Input/ui-input.module.css";


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

  error?: boolean;
}


const Input = ({className, children, error = false, ...otherProps}: InputProps) => {
  const InputClassName = `${styles.input_global} ${error ? styles.error : ""} ${className}`;
  return (
      <input className={InputClassName} {...otherProps} />
  );
};
export default Input;
