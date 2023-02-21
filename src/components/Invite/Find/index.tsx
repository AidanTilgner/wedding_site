import React, { useEffect, useState } from "react";
import Styles from "./Find.module.scss";

function index() {
  const [query, setQuery] = useState("Aidan Tilgner");
  const [typingTimeout, setTypingTimeout] = useState<number>();
  const [result, setResult] = useState<Guest>();

  const handleSearch = async () => {
    try {
      const data = await fetch(`/api/guests/find?name=${query}`).then((res) =>
        res.json()
      );

      setResult(data);
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

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [query]);

  const handleSelectInvite = () => {
    if (!result) return;
    window.location.href = `/invite/${result?.id}`;
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
        <h3>Results:</h3>
        {query.length > 2 && result && (
          <div className={Styles.guestCard} onClick={handleSelectInvite}>
            <p>{`${result.first_name} ${result.last_name}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default index;
