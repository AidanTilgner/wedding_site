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

  return <div className={Styles.invite}>index</div>;
}

export default YourInvite;
