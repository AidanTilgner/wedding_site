import React, { useEffect, useState } from "react";
import Styles from "./Find.module.scss";

function index() {
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<number>();
  const [result, setResult] = useState<Guest>();

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

  const handleSelectInvite = () => {
    if (!result) return;
    window.location.href = `/invite/view?id=${result?.id}`;
  };

  return (
    <div className={Styles.find}>
      <div className={Styles.search}>
        <label htmlFor="search_invite">Type your full name...</label>
        <input
          id="search_invite"
          placeholder="Enter your name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className={Styles.result}>
        {query.length > 2 && result ? (
          <>
            <h3>Results:</h3>
            <div
              className={Styles.guestCard}
              onClick={handleSelectInvite}
              tabIndex={0}
            >
              <p>{`${result.first_name} ${result.last_name}`}</p>
            </div>
          </>
        ) : (
          query.length > 2 &&
          !result && (
            <p className={Styles.sorry_text}>
              Looks like we can't find your invitation :/ . If you believe this
              is a mistake, please contact us and we'll figure it out :D
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default index;
