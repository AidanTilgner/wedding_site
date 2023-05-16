import React, { useEffect, useState } from "react";
import Styles from "./Countdown.module.scss";

function Countdown({ date }: { date: Date }) {
  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();

  const updateCountdown = () => {
    const differenceInMilliseconds = date.getTime() - new Date().getTime();

    const millisecondsInMinute = 1000 * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;

    const days = Math.floor(differenceInMilliseconds / millisecondsInDay);
    const hours = Math.floor(
      (differenceInMilliseconds % millisecondsInDay) / millisecondsInHour
    );
    const minutes = Math.floor(
      (differenceInMilliseconds % millisecondsInHour) / millisecondsInMinute
    );
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
  };

  const check = setInterval(updateCountdown, 1000);
  useEffect(() => {
    updateCountdown();

    return () => {
      clearInterval(check);
    };
  }, []);

  const getMinutesLanguage = () => {
    // if minutes is plural, return "minutes", otherwise return "minute"
    return minutes === 1 ? "Minute" : "Minutes";
  };

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
        <p className={Styles.type}>{getMinutesLanguage()}</p>
      </div>
    </div>
  );
}

export default Countdown;
