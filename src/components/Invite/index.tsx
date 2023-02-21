import React, { useEffect, useState } from "react";
import Step1Styles from "./Step1.module.scss";

function YourInvite({ step }: { step: number }) {
  const [inviteID, setInviteID] = useState<string | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);

  const getGuestById = async (id: string) => {
    const data = await fetch(`/api/guests/find?id=${id}`).then((res) =>
      res.json()
    );

    setGuest(data);
  };

  useEffect(() => {
    const inviteID =
      new URLSearchParams(window.location.search).get("id") ||
      localStorage.getItem("inviteID");

    if (inviteID) {
      localStorage.setItem("inviteID", inviteID);
      setInviteID(inviteID);
      getGuestById(inviteID);
    }
  }, []);

  console.log("InviteID", inviteID);
  console.log("Guest", guest);

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
