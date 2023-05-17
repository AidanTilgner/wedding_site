import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

function index() {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [inviteID, setInviteID] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getGuestById = async (id: string) => {
    setLoading(true);
    const { message, guest } = await fetch(`/api/guests/find?id=${id}`).then(
      (res) => res.json()
    );

    setGuest(guest);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const inviteID =
      new URLSearchParams(window.location.search).get("id") ||
      localStorage.getItem("inviteID");

    if (!inviteID) {
      window.location.href = "/invite/not-found";
      return;
    }

    localStorage.setItem("inviteID", inviteID);
    setInviteID(inviteID);
    getGuestById(inviteID);

    return () => {
      document.documentElement.style.setProperty("--navbar-display", "flex");
    };
  }, []);

  const rsvpGuest = async () => {
    const { message, guest } = await fetch(`/api/guests/rsvp?id=${inviteID}`, {
      method: "POST",
    }).then((res) => res.json());

    setGuest(guest);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1
          style={{
            fontFamily: "Dancing Script, cursive",
            fontSize: "56px",
            fontWeight: "500",
          }}
        >
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className={styles.RSVPButton}>
      {guest?.rsvp ? (
        <p>
          Looks like {guest?.first_name} {guest?.last_name} is RSVPed! View the
          invitation <a href={`/invite/view?id=${inviteID}`}>here</a>.
        </p>
      ) : (
        <button onClick={rsvpGuest}>
          Click to RSVP as {guest?.first_name} {guest?.last_name}
        </button>
      )}
    </div>
  );
}

export default index;
