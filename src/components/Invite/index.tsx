import React, { useEffect, useState } from "react";
import Styles from "./Invite.module.scss";

function YourInvite() {
  const [inviteID, setInviteID] = useState<string | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    setInviteID(id);
  }, []);

  console.log("InviteID", inviteID);

  return (
    <div className={Styles.invite}>
      <div className={Styles.date}>
        <p>08.28.23</p>
      </div>
      <div className={Styles.title}>
        <h1>You're Invited</h1>
      </div>
      <div className={Styles.line}></div>
      <div className={Styles.text}>
        <p>Laney Brokaw and Aidan Tilgner are getting married!</p>
      </div>
      <div className={Styles.cta}>
        <button>Continue</button>
      </div>
    </div>
  );
}

export default YourInvite;
