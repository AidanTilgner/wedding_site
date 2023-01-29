import React, { useEffect, useState } from "react";
import Styles from "./Countdown.module.scss";
import { getDaysUntil } from "../../utils/dates";

function Countdown({ date }: { date: Date }) {
  const [days, setDays] = useState<number>();

  const updateCountdown = () => {
    const diff = getDaysUntil(date);
    setDays(diff);
  };

  const check = setInterval(updateCountdown, 1000);
  useEffect(() => {
    updateCountdown();

    return () => {
      clearInterval(check);
    };
  }, []);

  return (
    <div className={Styles.countdown}>
      <div className={Styles.item}>
        <p className={Styles.number}>{days}</p>
        <p className={Styles.type}>Days</p>
      </div>
    </div>
  );
}

export default Countdown;
