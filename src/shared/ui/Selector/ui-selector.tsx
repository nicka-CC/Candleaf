import React from "react";
import styles from "@/src/shared/ui/Selector/ui-selector.module.css";
import classNames from "../../lib/classnames/classnames";
import {ChevronDown} from "lucide-react";

interface SelectorProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const Selector = ({ className, children, ...props }: SelectorProps) => {
  return (
    <div className={classNames(styles.container, {}, [className || ""])}>
      <select className={styles.select} {...props}>
        {children}
      </select>
      <ChevronDown className={styles.icon}/>
    </div>
  );
};

export default Selector;
