import React, { useEffect, useState } from "react";
import Step1Styles from "./Step1.module.scss";

function YourInvite({ step }: { step: number }) {
  const [inviteID, setInviteID] = useState<string | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    setInviteID(id);
  }, []);

  console.log("InviteID", inviteID);

  switch (step) {
    case 1:
      return <Step1 />;
  }
}

export default YourInvite;

const Step1 = () => {
  return (
    <div className={Step1Styles.invite}>
      <div className={Step1Styles.date}>
        <p>08.28.23</p>
      </div>
      <div className={Step1Styles.title}>
        <h1>You're Invited</h1>
      </div>
      <div className={Step1Styles.line}></div>
      <div className={Step1Styles.text}>
        <p>Laney Brokaw and Aidan Tilgner are getting married!</p>
      </div>
      <div className={Step1Styles.cta}>
        <button>Continue</button>
      </div>
    </div>
  );
};
