import React, { useState, useEffect } from "react";
import BPChart from "./components/BPChart";
import BPTable from "./components/BPTable";
import BPForm from "./components/BPForm";
import LimitsForm from "./components/LimitsForm";
import DateFilter from "./components/DateFilter";
import Dashboard from "./components/Dashboard";
import { getReadings, getBPLimits } from "./api/bpApi";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useToast } from "./components/Toast";
import "./styles/main.css";

const DEFAULT_LIMITS = {
  systolic_low_limit_1: 90,
  systolic_high_limit_1: 120,
  systolic_low_limit_2: 80,
  systolic_high_limit_2: 140,
  diastolic_low_limit_1: 60,
  diastolic_high_limit_1: 80,
  diastolic_low_limit_2: 50,
  diastolic_high_limit_2: 90,
};

function App() {
  const [readings, setReadings] = useState([]);
  const [limits, setLimits] = useState(useLocalStorage('bp-limits', DEFAULT_LIMITS));
  const [dateFilter, setDateFilter] = useLocalStorage('bp-date-filter', { from: "", to: "" });
  const [loading, setLoading] = useState(true);
  const { showToast, ToastContainer } = useToast();
  // const [limits, setLimits] = useState(DEFAULT_LIMITS);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [readingsRes, limitsRes] = await Promise.all([
        getReadings(),
        getBPLimits().catch(() => ({ data: DEFAULT_LIMITS }))
      ]);
      
      setReadings(readingsRes.data.map(item => ({
        id: item.id,
        systolic: item.systolic,
        diastolic: item.diastolic,
        date: item.reading_time,
      })));
      
      setLimits(limitsRes.data);
      showToast('Data loaded successfully', 'success');
    } catch (error) {
      console.error("Failed to fetch data:", error);
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredReadings = readings.filter(reading => {
    const readingDate = new Date(reading.date);
    const fromDate = dateFilter.from ? new Date(dateFilter.from) : null;
    const toDate = dateFilter.to ? new Date(dateFilter.to) : null;

    if (fromDate && readingDate < fromDate) return false;
    if (toDate && readingDate > toDate) return false;
    return true;
  });

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🩺 Blood Pressure Tracker</h1>
        <p>Monitor and track your blood pressure readings</p>
      </header>
      
      <Dashboard readings={filteredReadings} limits={limits} />
      
      <div className="main-grid">
        <div className="left-panel">
          <DateFilter onFilter={setDateFilter} readings={readings} />
          <LimitsForm limits={limits} setLimits={setLimits} readings={filteredReadings} showToast={showToast} />
          <BPForm onDataChange={fetchData} showToast={showToast} />
        </div>
        
        <div className="right-panel">
          <BPChart readings={filteredReadings} limits={DEFAULT_LIMITS} onDataChange={fetchData} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;