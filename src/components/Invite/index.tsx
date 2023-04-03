import React, { DOMElement, useEffect, useRef, useState } from "react";
import { staggerText } from "../../utils/animations";
import Step1Styles from "./Step1.module.scss";
import Step2Styles from "./Step2.module.scss";
import Step3Styles from "./Step3.module.scss";
import Button from "../Buttons/Button";

function YourInvite() {
  const [step, setStep] = useState(1);
  const [inviteID, setInviteID] = useState<string | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);
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
    document.documentElement.style.setProperty("--navbar-display", "none");
    setLoading(true);
    const inviteID =
      new URLSearchParams(window.location.search).get("id") ||
      localStorage.getItem("inviteID");

    if (!inviteID) {
      window.location.href = "/invite/not-found";
      return;
    }

    const viewedInvite = localStorage.getItem("viewedInvite");

    if (viewedInvite === "true") {
      setStep(3);
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

  switch (step) {
    case 1:
      return <Step1 guest={guest} incrementStep={() => setStep(2)} />;
    case 2:
      return <Step2 guest={guest} incrementStep={() => setStep(3)} />;
    case 3:
      return (
        <Step3
          guest={guest}
          setStep={(step: 1 | 2 | 3) => setStep(step)}
          rsvpGuest={rsvpGuest}
        />
      );
  }
}

export default YourInvite;

const Step1 = ({
  guest,
  incrementStep,
}: {
  guest: Guest | null;
  incrementStep: () => void;
}) => {
  const lettersRef1 = useRef(null);
  const lettersRef2 = useRef(null);
  const lettersRef3 = useRef(null);

  useEffect(() => {
    let t1: null | number = null;
    if (lettersRef1.current) {
      t1 = staggerText(lettersRef1.current, 1000);
    }

    let t2: null | number = null;
    if (lettersRef2.current) {
      t2 = staggerText(lettersRef2.current, 1000);
    }

    let t3: null | number = null;
    if (lettersRef3.current) {
      t3 = staggerText(lettersRef3.current, 1000);
    }

    return () => {
      if (t1) {
        clearTimeout(t1);
      }
      if (t2) {
        clearTimeout(t2);
      }
      if (t3) {
        clearTimeout(t3);
      }
    };
  }, [guest]);

  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: null | number = null;
    if (ctaRef.current) {
      ctaRef.current.style.display = "none";
    }
    const t = setTimeout(() => {
      if (!!ctaRef.current) {
        ctaRef.current.style.display = "initial";
        ctaRef.current.animate(
          [
            {
              opacity: 0,
            },
            {
              opacity: 1,
            },
          ],
          {
            duration: 3000,
            easing: "ease-in-out",
          }
        );
      }
    }, 14000);
    timeout = t;
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [guest]);

  return (
    <div className={Step1Styles.invite}>
      {guest && (
        <div className={Step1Styles.text}>
          <h2>Hello, {guest?.first_name}!</h2>
          <p>From Laney and Aidan:</p>
          <p className="message staggered-text">
            <span className="letters" ref={lettersRef1}>
              We hope that this message finds you and your family well.
            </span>
          </p>
          <p className="message staggered-text">
            <span className="letters" ref={lettersRef2}>
              As you may know, we are getting married! We've set our official
              date for August 28th, 2023!
            </span>
          </p>
          <p className="message staggered-text">
            <span className="letters" ref={lettersRef3}>
              We're excited to announce that we've created our guest list, and
              well...
            </span>
          </p>
        </div>
      )}
      {guest && (
        <div className={Step1Styles.cta} ref={ctaRef}>
          <button onClick={incrementStep}>Continue</button>
        </div>
      )}
    </div>
  );
};

const Step2 = ({
  guest,
  incrementStep,
}: {
  guest: Guest | null;
  incrementStep: () => void;
}) => {
  return (
    <div className={Step2Styles.invite}>
      <div className={Step2Styles.date}>
        <p>08.28.23</p>
      </div>
      <div className={Step2Styles.title}>
        <h1>You're Invited!</h1>
      </div>
      <div className={Step2Styles.line}></div>
      <div className={Step2Styles.text}>
        <p>
          {guest?.invitation_message ||
            "We hope that you can join us for our wedding!"}
        </p>
      </div>
      <div className={Step2Styles.cta}>
        <button onClick={incrementStep}>Continue</button>
      </div>
    </div>
  );
};

const Step3 = ({
  guest,
  setStep,
  rsvpGuest,
}: {
  guest: Guest | null;
  setStep: (step: 1 | 2 | 3) => void;
  rsvpGuest: () => void;
}) => {
  document.documentElement.style.setProperty("--navbar-display", "flex");

  useEffect(() => {
    localStorage.setItem("viewedInvite", "true");
  }, []);

  const replayInvite = () => {
    document.documentElement.style.setProperty("--navbar-display", "none");
    localStorage.setItem("viewedInvite", "false");
    setStep(1);
  };

  return (
    <div className={Step3Styles.invite}>
      <div className={Step3Styles.title}>
        <h2>Next Steps</h2>
      </div>
      <p className={Step3Styles.notice}>
        {guest?.rsvp ? (
          <span>
            RSVP confirmed for {guest?.first_name} {guest?.last_name}! We can't
            wait to see you on <strong>August 28th, 2023, at 6:00pm</strong>!
          </span>
        ) : (
          <span>* Please RSVP by August 1st, 2023</span>
        )}
      </p>
      <ul className={Step3Styles.navigation}>
        {!guest?.rsvp && (
          <li>
            <p>
              RSVP to the wedding as "{guest?.first_name} {guest?.last_name}"
            </p>
            <Button onClick={rsvpGuest} type="primary">
              I'm coming!
            </Button>
          </li>
        )}
        <li>
          <p>
            If you have multiple invites, add another by going to{" "}
            <a href="/invite">this page</a> and clicking "Find Invitation". Or
            if you have multiple links, you can use them to find invites for
            other guests.
          </p>
        </li>
        <li>
          <p>
            Find answers to some <a href="/faqs">frequently asked questions</a>
          </p>
        </li>
        <li>
          <p>
            See who's in our <a href="/wedding-party">wedding party</a> and get
            to know them a little better
          </p>
        </li>
        <li>
          <p>
            <a
              onClick={replayInvite}
              style={{
                cursor: "pointer",
              }}
            >
              Replay your wedding invitation
            </a>
          </p>
        </li>
      </ul>
      <p className={Step3Styles.note}>
        * Your invitation is now saved on this browser, you can view it here
        whenever you'd like :D
      </p>
    </div>
  );
};
