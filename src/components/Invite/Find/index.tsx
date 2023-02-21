import React, { useState } from "react";
import Styles from "./Find.module.scss";

function index() {
  const [query, setQuery] = useState("");
  return (
    <div className={Styles.find}>
      <div className={Styles.search}>
        <label htmlFor="search_invite">Search</label>
        <input
          id="search_invite"
          placeholder="Enter your name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}

export default index;
