import React, { useState } from "react";
import { addReading } from "../api/bpApi";
import { validateBPReading } from "../utils/validation";

const BPForm = ({ onDataChange, showToast }) => {
  const [formData, setFormData] = useState({
    systolic: "",
    diastolic: "",
    reading_time: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateBPReading(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await addReading({
        systolic: Number(formData.systolic),
        diastolic: Number(formData.diastolic),
        reading_time: formData.reading_time,
      });
      
      setFormData({ systolic: "", diastolic: "", reading_time: "" });
      setErrors({});
      showToast?.('Reading added successfully', 'success');
      onDataChange?.();
    } catch (error) {
      const errorMsg = "Failed to add reading. Please try again.";
      setErrors({ submit: errorMsg });
      showToast?.(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Add New Reading</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          name="reading_time"
          value={formData.reading_time}
          onChange={handleChange}
          placeholder="Date & Time"
        />
        {errors.reading_time && <span className="error">{errors.reading_time}</span>}

        <input
          type="number"
          name="systolic"
          value={formData.systolic}
          onChange={handleChange}
          placeholder="Systolic"
          min="0"
          max="140"
        />
        {errors.systolic && <span className="error">{errors.systolic}</span>}

        <input
          type="number"
          name="diastolic"
          value={formData.diastolic}
          onChange={handleChange}
          placeholder="Diastolic"
          min="0"
          max="140"
        />
        {errors.diastolic && <span className="error">{errors.diastolic}</span>}

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Reading"}
        </button>
        
        {errors.submit && <span className="error">{errors.submit}</span>}
      </form>
    </section>
  );
};

export default BPForm;