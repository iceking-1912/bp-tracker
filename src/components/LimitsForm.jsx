import React from "react";
import { updateBPLimits } from "../api/bpApi";

const LimitsForm = ({ limits, setLimits, readings, showToast }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Allow empty string for typing, otherwise clamp between 0 and 140
    let newValue = value === "" ? "" : Math.max(0, Math.min(140, Number(value)));
    setLimits(prev => ({
      ...prev,
      [name]: newValue === "" ? "" : String(newValue)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert all values to numbers before sending
    const numericLimits = Object.fromEntries(
      Object.entries(limits).map(([key, val]) => [key, Number(val)])
    );
    try {
      await updateBPLimits(numericLimits);
      showToast?.("Limits updated successfully!", 'success');
    } catch (error) {
      showToast?.("Failed to update limits", 'error');
    }
  };

  return (
    <section>
      <h2>BP Limits Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="limits-grid">
          <div>
            <label>Systolic Normal Range:</label>
            <input
              name="systolic_low_limit_1"
              type="number"
              value={limits.systolic_low_limit_1}
              onChange={handleChange}
              min="0"
              max="140"
            />
            -
            <input
              name="systolic_high_limit_1"
              type="number"
              value={limits.systolic_high_limit_1}
              onChange={handleChange}
              min="0"
              max="140"
            />
          </div>
          <div>
            <label>Systolic Warning Range:</label>
            <input
              name="systolic_low_limit_2"
              type="number"
              value={limits.systolic_low_limit_2}
              onChange={handleChange}
              min="0"
              max="140"
            />
            -
            <input
              name="systolic_high_limit_2"
              type="number"
              value={limits.systolic_high_limit_2}
              onChange={handleChange}
              min="0"
              max="140"
            />
          </div>
          <div>
            <label>Diastolic Normal Range:</label>
            <input
              name="diastolic_low_limit_1"
              type="number"
              value={limits.diastolic_low_limit_1}
              onChange={handleChange}
              min="0"
              max="140"
            />
            -
            <input
              name="diastolic_high_limit_1"
              type="number"
              value={limits.diastolic_high_limit_1}
              onChange={handleChange}
              min="0"
              max="140"
            />
          </div>
          <div>
            <label>Diastolic Warning Range:</label>
            <input
              name="diastolic_low_limit_2"
              type="number"
              value={limits.diastolic_low_limit_2}
              onChange={handleChange}
              min="0"
              max="140"
            />
            -
            <input
              name="diastolic_high_limit_2"
              type="number"
              value={limits.diastolic_high_limit_2}
              onChange={handleChange}
              min="0"
              max="140"
            />
          </div>
        </div>
        <button type="submit">Update Limits</button>
      </form>
    </section>
  );
};

export default LimitsForm;