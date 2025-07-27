import React, { useState } from "react";
import { updateReading, deleteReading } from "../api/bpApi";
import { getSystolicColor, getDiastolicColor } from "../utils/colorUtils";
import { validateBPReading } from "../utils/validation";

const BPTable = ({ readings, onDataChange, limits }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [errors, setErrors] = useState({});

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
  };

  const handleEdit = (reading) => {
    setEditingId(reading.id);
    setEditData({
      systolic: reading.systolic,
      diastolic: reading.diastolic,
      reading_time: reading.date.slice(0, 16)
    });
  };

  const handleSave = async () => {
    const validationErrors = validateBPReading(editData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await updateReading(editingId, {
        systolic: Number(editData.systolic),
        diastolic: Number(editData.diastolic),
        reading_time: editData.reading_time
      });
      
      setEditingId(null);
      setEditData({});
      setErrors({});
      onDataChange?.();
    } catch (error) {
      setErrors({ submit: "Failed to update reading" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reading?")) {
      try {
        await deleteReading(id);
        onDataChange?.();
      } catch (error) {
        alert("Failed to delete reading");
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
    setErrors({});
  };

  return (
    <section>
      <h2>BP Readings</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Systolic</th>
            <th>Diastolic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {readings.map((reading) => {
            const { date, time } = formatDateTime(reading.date);
            const isEditing = editingId === reading.id;
            
            return (
              <tr key={reading.id}>
                <td>{date}</td>
                <td>{time}</td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.systolic}
                      onChange={(e) => setEditData(prev => ({ ...prev, systolic: e.target.value }))}
                      min="0"
                      max="140"
                    />
                  ) : (
                    <span style={{ 
                      color: getSystolicColor(reading.systolic, limits) 
                    }}>
                      {reading.systolic}
                    </span>
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.diastolic}
                      onChange={(e) => setEditData(prev => ({ ...prev, diastolic: e.target.value }))}
                      min="0"
                      max="140"
                    />
                  ) : (
                    <span style={{ 
                      color: getDiastolicColor(reading.diastolic, limits) 
                    }}>
                      {reading.diastolic}
                    </span>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    {isEditing ? (
                      <>
                        <button onClick={handleSave} className="btn-save">✓</button>
                        <button onClick={handleCancel} className="btn-cancel">✕</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(reading)} className="btn-edit">✏️</button>
                        <button onClick={() => handleDelete(reading.id)} className="btn-delete">🗑️</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {Object.keys(errors).length > 0 && (
        <div className="error">
          {Object.values(errors).map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BPTable;