import React, { useEffect, useState } from "react";
import Styles from "./Find.module.scss";

function index({
  displayText = "Type your full name",
  placeholder = "Enter your name...",
  redirectURL = "/invite/view",
}: {
  displayText?: string;
  placeholder?: string;
  redirectURL?: string;
}) {
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<number>();
  const [result, setResult] = useState<Guest[]>();

  const handleSearch = async () => {
    try {
      const { message, guest } = await fetch(
        `/api/guests/find?name=${query}`
      ).then((res) => res.json());

      setResult(guest);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (query.length > 2) {
          handleSearch();
        }
      }, 500)
    );

    if (query.length < 3) {
      setResult(undefined);
    }

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [query]);

  const handleSelectInvite = (id: string) => {
    if (!result) return;
    window.location.href = `${redirectURL}?id=${id}`;
  };

  return (
    <div className={Styles.find}>
      <div className={Styles.search}>
        <label htmlFor="search_invite">{displayText}</label>
        <input
          id="search_invite"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className={Styles.result}>
        {query.length > 1 && result ? (
          <>
            <h3>Results:</h3>
            {result.map((guest) => {
              return (
                <div
                  className={Styles.guestCard}
                  onClick={() => {
                    handleSelectInvite(guest.id);
                  }}
                  tabIndex={0}
                  key={guest.id}
                >
                  <p>{`${guest.first_name} ${guest.last_name}`}</p>
                </div>
              );
            })}
            <p className={Styles.disclaimer}>
              If you're not seeing the right name, feel free to contact us with
              the information below.
            </p>
          </>
        ) : (
          query.length > 2 &&
          !result && (
            <p className={Styles.disclaimer}>
              Looks like we can't find that invitation :/ . If you believe this
              is a mistake, please contact us and we'll figure it out :D
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default index;
