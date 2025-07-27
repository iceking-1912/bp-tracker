import React from "react";

const Dashboard = ({ readings, limits }) => {
  if (!readings.length) return null;

  const latest = readings[readings.length - 1];
  const avgSystolic = Math.round(readings.reduce((sum, r) => sum + r.systolic, 0) / readings.length);
  const avgDiastolic = Math.round(readings.reduce((sum, r) => sum + r.diastolic, 0) / readings.length);
  
  const normalReadings = readings.filter(r => 
    r.systolic >= limits.systolic_low_limit_1 && r.systolic <= limits.systolic_high_limit_1 &&
    r.diastolic >= limits.diastolic_low_limit_1 && r.diastolic <= limits.diastolic_high_limit_1
  ).length;

  const normalPercentage = Math.round((normalReadings / readings.length) * 100);

  return (
    <div className="dashboard">
      <div className="stat-card">
        <h3>Latest Reading</h3>
        <div className="stat-value">{latest.systolic}/{latest.diastolic}</div>
        <div className="stat-date">{new Date(latest.date).toLocaleDateString()}</div>
      </div>
      
      <div className="stat-card">
        <h3>Average BP</h3>
        <div className="stat-value">{avgSystolic}/{avgDiastolic}</div>
        <div className="stat-label">mmHg</div>
      </div>
      
      <div className="stat-card">
        <h3>Total Readings</h3>
        <div className="stat-value">{readings.length}</div>
        <div className="stat-label">entries</div>
      </div>
      
      <div className="stat-card">
        <h3>Normal Readings</h3>
        <div className="stat-value">{normalPercentage}%</div>
        <div className="stat-label">{normalReadings} of {readings.length}</div>
      </div>
    </div>
  );
};

export default Dashboard;