'use client'
import Input from "@/src/shared/ui/Input/ui-input";
import styles from "@/src/(pages)/home/index.module.css";
import { Checkbox } from "@/src/shared/ui/index";
import Search from "@/src/widgets/search";
import { useEffect, useState } from "react";
import UiButton from "@/src/shared/ui/Button/ui-button";

/**
 * @page Home
 */

const HomePage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    console.log(!isChecked);
  };
  return (
    <div className={styles.container}>
      <Input
        className={styles.input}
        type="text"
        theme="secondary"
        icon="right"
        placeholder="Primary Input"
      />
      <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      <UiButton theme={'third'}>ffff</UiButton>
    </div>
  );
};

export default HomePage;