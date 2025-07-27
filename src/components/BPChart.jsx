import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
  Dot,
} from "recharts";
import { getSystolicColor, getDiastolicColor } from "../utils/colorUtils";
import BPTable from "./BPTable";

const CustomDot = ({ cx, cy, payload, dataKey, limits }) => {
  if (!payload) return null;
  
  const color = dataKey === 'systolic' 
    ? getSystolicColor(payload[dataKey], limits)
    : getDiastolicColor(payload[dataKey], limits);
    
  return <Dot cx={cx} cy={cy} r={4} fill={color} stroke={color} strokeWidth={2} />;
};

const BPChart = ({ readings = [], limits, onDataChange }) => {
  const [showTable, setShowTable] = useState(false);

  if (!readings.length) {
    return (
      <section className="chart-section">
        <div className="chart-header">
          <h2>BP Trend Chart</h2>
          <button onClick={() => setShowTable(true)} className="table-btn">
            View Table
          </button>
        </div>
        <div className="no-data">No data to display</div>
      </section>
    );
  }

  const chartData = readings.map((reading, idx) => ({
    ...reading,
    index: idx,
    date: new Date(reading.date).toLocaleDateString(),
  }));

  return (
    <>
      <section className="chart-section">
        <div className="chart-header">
          <h2>BP Trend Chart</h2>
          <button onClick={() => setShowTable(true)} className="table-btn">
            📊 View Table
          </button>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" fontSize={12} />
            <YAxis domain={[0, 140]} fontSize={12} />
            <Tooltip />
            <Legend />
            
            {/* All 8 Reference Lines */}
            <ReferenceLine 
              y={limits.systolic_high_limit_1} 
              stroke="#27ae60" 
              strokeDasharray="5 5" 
              label="Sys Normal High" 
            />
            <ReferenceLine 
              y={limits.systolic_low_limit_1} 
              stroke="#27ae60" 
              strokeDasharray="5 5" 
              label="Sys Normal Low" 
            />
            <ReferenceLine 
              y={limits.systolic_high_limit_2} 
              stroke="#f39c12" 
              strokeDasharray="5 5" 
              label="Sys Warning High" 
            />
            <ReferenceLine 
              y={limits.systolic_low_limit_2} 
              stroke="#f39c12" 
              strokeDasharray="5 5" 
              label="Sys Warning Low" 
            />
            <ReferenceLine 
              y={limits.diastolic_high_limit_1} 
              stroke="#3498db" 
              strokeDasharray="3 3" 
              label="Dia Normal High" 
            />
            <ReferenceLine 
              y={limits.diastolic_low_limit_1} 
              stroke="#3498db" 
              strokeDasharray="3 3" 
              label="Dia Normal Low" 
            />
            <ReferenceLine 
              y={limits.diastolic_high_limit_2} 
              stroke="#9b59b6" 
              strokeDasharray="3 3" 
              label="Dia Warning High" 
            />
            <ReferenceLine 
              y={limits.diastolic_low_limit_2} 
              stroke="#9b59b6" 
              strokeDasharray="3 3" 
              label="Dia Warning Low" 
            />

            <Line
              type="monotone"
              dataKey="systolic"
              stroke="#2980b9"
              strokeWidth={2}
              name="Systolic"
              dot={<CustomDot dataKey="systolic" limits={limits} />}
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              stroke="#8e44ad"
              strokeWidth={2}
              name="Diastolic"
              dot={<CustomDot dataKey="diastolic" limits={limits} />}
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="color-legend">
          <div className="legend-item">
            <span className="color-dot green"></span>
            <span>Normal (within main range)</span>
          </div>
          <div className="legend-item">
            <span className="color-dot orange"></span>
            <span>Slightly abnormal (secondary range)</span>
          </div>
          <div className="legend-item">
            <span className="color-dot red"></span>
            <span>Critical (outside all ranges)</span>
          </div>
        </div>
      </section>

      {showTable && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-header">
              <h3>BP Readings Table</h3>
              <button onClick={() => setShowTable(false)} className="close-btn">
                ✕
              </button>
            </div>
            <BPTable readings={readings} onDataChange={onDataChange} limits={limits} />
          </div>
        </div>
      )}
    </>
  );
};

export default BPChart;