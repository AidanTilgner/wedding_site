import React, { useEffect, useState } from "react";
import styles from "./SeatingChart.module.scss";

type Table = {
  name: string;
  members: { name: string; id: string }[];
};

function SeatingChart() {
  const [tables, setTables] = useState<Table[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/seating-chart");
      const data = await res.json();
      setLoading(false);

      setTables(data.tables);
    })();
  }, []);

  const getFormattedTableName = (name: string) => {
    let newName = name.split(" ")[0];
    newName = newName.replace(/-/g, " ");
    newName = newName.charAt(0).toUpperCase() + newName.slice(1);
    return newName;
  };

  const filteredTables = tables
    .map((table) => {
      const members = table.members.filter((member) =>
        member.name.toLowerCase().includes(query.toLowerCase())
      );

      return { ...table, members };
    })
    .filter((table) => table.members.length)
    .filter((table) => table.name !== "sweetheart");

  return (
    <div className={styles.seatingChart}>
      <div className={styles.search}>
        <input
          placeholder="Search for your name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}
      <div className={styles.tables}>
        {filteredTables.length ? (
          filteredTables.map((table) => {
            return (
              <div key={table.name} className={styles.table}>
                <h3>{getFormattedTableName(table.name)}</h3>
                <ul>
                  {table.members.map((member) => {
                    return <li key={member.id}>{member.name}</li>;
                  })}
                </ul>
              </div>
            );
          })
        ) : query ? (
          <p>No results.</p>
        ) : (
          <p>Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}

export default SeatingChart;
