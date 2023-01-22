import React, { useEffect, useState } from "react";
import Styles from "./Countdown.module.scss";
import { getFormattedDateDifference } from "../../utils/dates";

function Countdown({ date }: { date: Date }) {
  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();

  const updateCountdown = () => {
    const diff = getFormattedDateDifference(date);
    setDays(diff.days);
    setHours(diff.hours);
    setMinutes(diff.minutes);
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
      <div className={Styles.item}>
        <p className={Styles.number}>{hours}</p>
        <p className={Styles.type}>Hours</p>
      </div>
      <div className={Styles.item}>
        <p className={Styles.number}>{minutes}</p>
        <p className={Styles.type}>Minutes</p>
      </div>
      <p
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          color: "red"
        }}
      >
        Fix the time
      </p>
    </div>
  );
}

export default Countdown;
