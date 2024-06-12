import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChildInfo.css";
import ChildImg from "../../assets/image/ChildDoctor.jpeg";
import { useChild } from "../../assets/useRef/ChildContext"; // Ensure this path is correct

const ChildInfo = () => {
  const [childInfo, setChildInfo] = useState([]);
  const [notes, setNotes] = useState([]);
  const [display, setDisplay] = useState("child");

  // Using useChild hook to get the current child ID
  const { ID } = useChild();

  // Fetch child information based on ID from context
  useEffect(() => {
    const fetchChildInfo = async () => {
      if (ID) {
        try {
          const response = await axios.get(
            `http://localhost:4406/api/doctor/child/ChildInfoPage/${ID}`
          );
          setChildInfo(response.data);
        } catch (error) {
          console.error("Error fetching child data:", error);
        }
      }
    };

    const fetchNotes = async () => {
      if (ID) {
        try {
          const response = await axios.get(
            `http://localhost:4406/api/doctor/child/notes/${ID}`
          );
          setNotes(response.data);
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      }
    };

    fetchChildInfo();
    fetchNotes();
  }, [ID]); // Depend on ID from the context

  const formatDate = (dateString) => {
    if (!dateString) {
      console.error("Invalid date string:", dateString);
      return "Invalid date"; // or you can return a default date or handle it as needed
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Cannot parse date:", dateString);
      return "Invalid date";
    }

    return new Intl.DateTimeFormat("ar-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  return (
    <div className="child-info-container">
      <div className="buttons-container">
        <button onClick={() => setDisplay("child")}>عرض معلومات الطفل</button>
        <button onClick={() => setDisplay("note")}>عرض الملاحظات</button>
      </div>

      <div>
        <img src={ChildImg} alt="Child background" className="Child-bg-img" />
      </div>
      {display === "child" && childInfo ? (
        <div className="card-img-child">
          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <td>الاسم</td>
                  <td>
                    {childInfo.first_name} {childInfo.last_name}
                  </td>
                </tr>
                <tr>
                  <td>رقم الهوية</td>
                  <td>{childInfo.ID}</td>
                </tr>
                <tr>
                  <td>الجنس</td>
                  <td>{childInfo.gender}</td>
                </tr>
                <tr>
                  <td>تاريخ الميلاد</td>
                  <td>{formatDate(childInfo.DOB)}</td>
                </tr>
                <tr>
                  <td>رقم الطفل التسلسلي</td>
                  <td>{childInfo.Child_Serial_No}</td>
                </tr>
                <tr>
                  <td>فصيلة الدم</td>
                  <td>{childInfo.blood_type}</td>
                </tr>
                <tr>
                  <td>الحساسية</td>
                  <td>{childInfo.allergy || "None"}</td>
                </tr>
                <tr>
                  <td>اسم الأم</td>
                  <td>
                    {childInfo.mother_first_name} {childInfo.mother_last_name}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : display === "note" ? (
        <div className="note-container">
          {notes.length > 0 ? (
            <table className="notes-table">
              <thead>
                <tr>
                  <th>التاريخ</th>
                  <th>الملاحظة</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note) => (
                  <tr key={note.ID}>
                    <td>{formatDate(note.NoteDate)}</td>
                    <td>{note.Note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No notes available.</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ChildInfo;
