import React, { useState } from "react";
import VaccinationTable from "../VacTable/VacTable";
import Add_Vac from "../Add_Vac/Add_Vac";
import "./VacDoctor.css"; 

const VacDoctor = () => {
  // State to toggle visibility of table and form
  const [showTable, setShowTable] = useState(true);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container">
      <button
        className="button"
        onClick={() => {
          setShowTable(true);
          setShowForm(false);
        }}
      >
        عرض جدول التطعيمات{" "}
      </button>
      <button
        className="button"
        onClick={() => {
          setShowForm(true);
          setShowTable(false);
        }}
      >
        اضافة تطعيمات
      </button>

      {/* Conditional rendering of the table */}
      {showTable && <VaccinationTable />}

      {/* Conditional rendering of the form */}
      {showForm && <Add_Vac />}
    </div>
  );
};

export default VacDoctor;
