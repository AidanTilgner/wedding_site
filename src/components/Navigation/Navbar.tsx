import React, { useState, useEffect } from "react";
import Button from "../Buttons/Button";
import Styles from "./Navbar.module.scss";

function Navbar({
  lowkey,
  pulses = false,
}: {
  lowkey?: boolean;
  pulses?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(pulses);

  useEffect(() => {
    if (open) {
      setShouldPulse(false);
    }
  }, [open]);

  return (
    <div className={`${Styles.navbar} ${lowkey ? Styles.lowkey : ""}`}>
      <div className={Styles.navbar_mobile}>
        {!open && !lowkey && (
          <div className={Styles.title_mobile}>
            <p>The Wedding of</p>
            <h2>Laney and Aidan</h2>
          </div>
        )}
        <div
          className={`${Styles.menu} ${
            pulses && shouldPulse ? Styles.pulses : ""
          }`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className={Styles.menu_icon}>
            {open ? (
              <div className={Styles.menu_open}>
                <line />
                <line />
              </div>
            ) : (
              <div className={Styles.menu_closed}>
                <line />
                <line />
              </div>
            )}
          </div>
        </div>
        {open && (
          <div className={Styles.nav_overlay}>
            <div className={Styles.title}>
              <p>The Wedding of</p>
              <h2>Laney and Aidan</h2>
            </div>
            <ul className={Styles.list_mobile}>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/wedding-party">Wedding Party</a>
              </li>
              <li>
                <a href="/faqs">FAQ's</a>
              </li>
              <li>
                <a href="/donations">Donations</a>
              </li>
              <li>
                <a href="/gallery">Gallery</a>
              </li>
              <li>
                <a href="/#info">Information</a>
              </li>
            </ul>
            <div className={Styles.rsvp}>
              <p>Have an invitation?</p>
              <Button
                onClick={() => {
                  window.location.href = "/invite";
                }}
                type="primary"
              >
                Click Here
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className={Styles.navbar_desktop}>
        <ul className={`${Styles.list} ${Styles.list_left}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/wedding-party">Party</a>
          </li>
          <li>
            <a href="/#info">Information</a>
          </li>
        </ul>
        <div className={Styles.title}>
          <p>The Wedding of</p>
          <h2>Laney and Aidan</h2>
        </div>
        <ul className={`${Styles.list} ${Styles.list_right}`}>
          <li>
            <a href="/faqs">FAQ's</a>
          </li>
          <li>
            <a href="/donations">Donations</a>
          </li>
          <li>
            <a href="/gallery">Gallery</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
