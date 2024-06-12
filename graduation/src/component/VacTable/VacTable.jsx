import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./VacTable.css";

// Utility function to format the date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const VacTable = () => {
  const { childId } = useParams(); // Get childId from URL parameters
  const [afterBirthData, setAfterBirthData] = useState(null);
  const [firstMonthData, setFirstMonthData] = useState(null);
  const [secondMonthData, setSecondMonthData] = useState(null);
  const [fourthMonthData, setFourthMonthData] = useState(null);
  const [sixthMonthData, setSixthMonthData] = useState(null);
  const [twelfthMonthData, setTwelfthMonthData] = useState(null);
  const [eighteenthMonthData, setEighteenthMonthData] = useState(null);

  useEffect(() => {
    if (!childId) return;

    const baseUrl = `http://localhost:4015/api/mother/MotherChildCard/Vac/${childId}`;
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Log the fetched data
        setAfterBirthData(data.after_birth?.[0] || {});
        setFirstMonthData(data.first_month?.[0] || {});
        setSecondMonthData(data.second_month?.[0] || {});
        setFourthMonthData(data.fourth_month?.[0] || {});
        setSixthMonthData(data.sixth_month?.[0] || {});
        setTwelfthMonthData(data.twelfth_month?.[0] || {});
        setEighteenthMonthData(data.eighteenth_month?.[0] || {});
      })
      .catch((error) => {
        console.error("Error fetching vaccination data:", error);
      });
  }, [childId]);

  return (
    <div>
      <div>
        <table className="rtl-table">
          <thead>
            <tr>
              <th>4</th>
              <th>3</th>
              <th>2</th>
              <th>1</th>
              <th></th>
              <th>اسم المطعوم</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{formatDate(afterBirthData?.Date)}</td>
              <td className="date">تاريخ التطعيم</td>
              <td rowSpan="3">BCG</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{afterBirthData?.BCG_ID}</td>
              <td className="lot-no">Lot No</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{afterBirthData?.Doctor_Name}</td>
              <td className="doctor-name">اسم الطبيب</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td className="disable"></td>
              <td></td>
              <td className="date">تاريخ التطعيم</td>
              <td rowSpan="3">Hepatitis B</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{afterBirthData?.Hepatitis_B_ID}</td>
              <td className="lot-no">Lot No</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td className="disable"></td>
              <td></td>
              <td className="doctor-name">اسم الطبيب</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{formatDate(secondMonthData?.date)}</td>
              <td>{formatDate(firstMonthData?.date)}</td>
              <td className="date">تاريخ التطعيم</td>
              <td rowSpan="3">IPV</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{secondMonthData?.IPV_ID}</td>
              <td>{firstMonthData?.IPV_ID}</td>
              <td className="lot-no">Lot No</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{secondMonthData?.Doctor_Name}</td>
              <td>{firstMonthData?.Doctor_Name}</td>
              <td className="doctor-name">اسم الطبيب</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>{formatDate(eighteenthMonthData?.date)}</td>
              <td>{formatDate(sixthMonthData?.date)}</td>
              <td>{formatDate(fourthMonthData?.date)}</td>
              <td>{formatDate(secondMonthData?.date)}</td>
              <td className="date">تاريخ التطعيم</td>
              <td rowSpan="3">OPV</td>
            </tr>
            <tr>
              <td>{eighteenthMonthData?.OPV_ID}</td>
              <td>{sixthMonthData?.OPV_ID}</td>
              <td>{fourthMonthData?.OPV_ID}</td>
              <td>{secondMonthData?.OPV_ID}</td>
              <td className="lot-no">Lot No</td>
            </tr>
            <tr>
              <td>{eighteenthMonthData?.Doctor_Name}</td>
              <td>{sixthMonthData?.Doctor_Name}</td>
              <td>{fourthMonthData?.Doctor_Name}</td>
              <td>{secondMonthData?.Doctor_Name}</td>
              <td className="doctor-name">اسم الطبيب</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="disable"></td>
              <td>{formatDate(sixthMonthData?.date)}</td>
              <td>{formatDate(fourthMonthData?.date)}</td>
              <td>{formatDate(secondMonthData?.date)}</td>
              <td className="date">تاريخ التطعيم</td>
              <td rowSpan="3">Rota</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td>{sixthMonthData?.Rota_Virus_ID}</td>
              <td>{fourthMonthData?.Rota_Virus_ID}</td>
              <td>{secondMonthData?.Rota_Virus_ID}</td>
              <td className="lot-no">Lot No</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td>{sixthMonthData?.Doctor_Name}</td>
              <td>{fourthMonthData?.Doctor_Name}</td>
              <td>{secondMonthData?.Doctor_Name}</td>
              <td className="doctor-name">اسم الطبيب</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="disable"></td>
              <td>{formatDate(sixthMonthData?.date)}</td>
              <td>{formatDate(fourthMonthData?.date)}</td>
              <td>{formatDate(secondMonthData?.date)}</td>
              <td className="date">تاريخ التطعيم</td>
              <td rowSpan="3">Penta</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td>{sixthMonthData?.Penta_ID}</td>
              <td>{fourthMonthData?.Penta_ID}</td>
              <td>{secondMonthData?.Penta_ID}</td>
              <td className="lot-no">Lot No</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td>{sixthMonthData?.Doctor_Name}</td>
              <td>{fourthMonthData?.Doctor_Name}</td>
              <td>{secondMonthData?.Doctor_Name}</td>
              <td className="doctor-name">اسم الطبيب</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="disable"></td>
              <td>{formatDate(twelfthMonthData?.date)}</td>
              <td>{formatDate(fourthMonthData?.date)}</td>
              <td>{formatDate(secondMonthData?.date)}</td>
              <td className="date">تاريخ التطعيم</td>
              <td rowSpan="3">PCV</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td>{twelfthMonthData?.PCV_ID}</td>
              <td>{fourthMonthData?.PCV_ID}</td>
              <td>{secondMonthData?.PCV_ID}</td>
              <td className="lot-no">Lot No</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td>{twelfthMonthData?.Doctor_Name}</td>
              <td>{fourthMonthData?.Doctor_Name}</td>
              <td>{secondMonthData?.Doctor_Name}</td>
              <td className="doctor-name">اسم الطبيب</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{formatDate(eighteenthMonthData?.date)}</td>
              <td>{formatDate(twelfthMonthData?.date)}</td>
              <td className="date">تاريخ التطعيم</td>
              <td rowSpan="3">MMR</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{eighteenthMonthData?.MMR_ID}</td>
              <td>{twelfthMonthData?.MMR_ID}</td>
              <td className="lot-no">Lot No</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{eighteenthMonthData?.Doctor_Name}</td>
              <td>{twelfthMonthData?.Doctor_Name}</td>
              <td className="doctor-name">اسم الطبيب</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{formatDate(eighteenthMonthData?.date)}</td>
              <td className="date">تاريخ التطعيم</td>
              <td rowSpan="3">DPT</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{eighteenthMonthData?.DPT_ID}</td>
              <td className="lot-no">Lot No</td>
            </tr>
            <tr>
              <td className="disable"></td>
              <td className="disable"></td>
              <td className="disable"></td>
              <td>{eighteenthMonthData?.Doctor_Name}</td>
              <td className="doctor-name">اسم الطبيب</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VacTable;
