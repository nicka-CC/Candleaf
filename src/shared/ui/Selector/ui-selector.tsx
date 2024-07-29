import React from "react";
import styles from "@/src/shared/ui/Selector/ui-selector.module.css";
import classNames from "../../lib/classnames/classnames";
import { ChevronDown } from "lucide-react";

interface SelectorProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: number[]; // Определяем, что options является массивом чисел
}

const Selector = ({ className, options, ...props }: SelectorProps) => {
  return (
    <div className={classNames(styles.container, {}, [className || ""])}>
      <select className={styles.select} {...props}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option} weeks
          </option>
        ))}
      </select>
      <ChevronDown className={styles.icon} />
    </div>
  );
};

export default Selector;
