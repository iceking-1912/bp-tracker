import React, { useState } from "react";

const DateFilter = ({ onFilter, readings }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ from, to });
  };

  const handleClear = () => {
    setFrom("");
    setTo("");
    onFilter({ from: "", to: "" });
  };

  return (
    <section>
      <h2>Filter by Date Range</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={from}
          onChange={e => setFrom(e.target.value)}
          placeholder="From Date"
        />
        <input
          type="date"
          value={to}
          onChange={e => setTo(e.target.value)}
          placeholder="To Date"
        />
        <button type="submit">Apply Filter</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
    </section>
  );
};

export default DateFilter;