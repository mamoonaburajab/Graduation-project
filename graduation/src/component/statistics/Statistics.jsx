import React, { useState, useEffect } from "react";
import "./Statistics.css";

const Statistics = () => {
  const [statistics, setStatistics] = useState({
    totalChildren: 0,
    maleChildren: 0,
    femaleChildren: 0,
    vaccinatedChildren: {
      after_birth: 0,
      first_month: 0,
      second_month: 0,
      fourth_month: 0,
      month_six: 0,
      Twelfth_month: 0,
      Eighteenth_month: 0,
    },
  });

  useEffect(() => {
    fetch("http://localhost:4801/api/doctor/statistics")
      .then((response) => response.json())
      .then((data) => setStatistics(data))
      .catch((error) => console.error("Error fetching statistics:", error));
  }, []);

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <h2>إحصائيات</h2>
      </div>
      <div className="statistics-content">
        <div className="statistics-overview">
          <div className="statistics-item">
            <h3>إجمالي عدد الأطفال في العيادة</h3>
            <p>{statistics.totalChildren}</p>
          </div>
          <div className="statistics-item">
            <h3>عدد الأطفال الذكور</h3>
            <p>{statistics.maleChildren}</p>
          </div>
          <div className="statistics-item">
            <h3>عدد الأطفال الإناث</h3>
            <p>{statistics.femaleChildren}</p>
          </div>
        </div>
        <div className="statistics-subheader">
          <h3>عدد الأطفال المطعمين حسب الشهر</h3>
        </div>
        <div className="statistics-vaccinated">
          {Object.entries(statistics.vaccinatedChildren).map(([key, value]) => (
            <div className="statistics-item" key={key}>
              <p>{translateKey(key)}:</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const translateKey = (key) => {
  const translations = {
    after_birth: "بعد الولادة",
    first_month: "الشهر الأول",
    second_month: "الشهر الثاني",
    fourth_month: "الشهر الرابع",
    month_six: "الشهر السادس",
    Twelfth_month: "الشهر الثاني عشر",
    Eighteenth_month: "الشهر الثامن عشر",
  };
  return translations[key] || key;
};

export default Statistics;
