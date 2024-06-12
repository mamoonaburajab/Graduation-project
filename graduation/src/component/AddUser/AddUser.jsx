import React, { useState, useRef } from "react";
import "./AddUser.css"; // Ensure the CSS file is in the same directory as this component

const AddUser = () => {
  const [userType, setUserType] = useState("طبيب"); // Default to 'طبيب'
  const formRef = useRef(null); // Reference to the form

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      type: userType,
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      ID: formData.get("ID"),
    };

    // Conditional fields based on the user type
    if (userType === "أم") {
      userData.phone_No = formData.get("phone_No");
      userData.City = formData.get("City");
      userData.husband_name = formData.get("husband_name");
      userData.husband_phone = formData.get("husband_phone");
    } else if (userType === "طفل") {
      userData.gender = formData.get("gender");
      userData.DOB = formData.get("DOB");
      userData.Child_Serial_No = formData.get("Child_Serial_No");
      userData.blood_type = formData.get("blood_type");
      userData.allergy = formData.get("allergy");
      userData.mom_ID = formData.get("mom_ID");
    } else if (userType === "طبيب") {
      userData.medical_ID_No = formData.get("medical_ID_No");
      userData.phone_No = formData.get("phone_No"); // Add doctor's phone number
    }

    fetch("http://localhost:3121/administrative_manager/AddUserPage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("تم إضافة المستخدم بنجاح");
        formRef.current.reset(); // Reset the form fields
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <div className="user-type-buttons">
        <button
          className="user-type-button"
          onClick={() => setUserType("طبيب")}
        >
          طبيب
        </button>
        <button className="user-type-button" onClick={() => setUserType("أم")}>
          أم
        </button>
        <button className="user-type-button" onClick={() => setUserType("طفل")}>
          طفل
        </button>
      </div>
      <div className="add-user-container">
        <div className="add-user-form">
          <form onSubmit={handleSubmit} ref={formRef}>
            <h2>إضافة {userType}</h2>
            <input
              name="first_name"
              className="form-input"
              type="text"
              placeholder="الاسم الأول"
              required
            />
            <input
              name="last_name"
              className="form-input"
              type="text"
              placeholder="الاسم الأخير"
              required
            />
            <input
              name="ID"
              className="form-input"
              type="text"
              placeholder="رقم الهوية"
              pattern="\d{9}"
              title="الرجاء ادخال رقم الهوية 9 ارقام فقط"
              required
            />
            {userType === "أم" && (
              <>
                <input
                  name="phone_No"
                  className="form-input"
                  type="text"
                  placeholder="رقم الهاتف"
                  pattern="\d{10}"
                  title="الرجاء ادخال 10 أرقام فقط"
                  required
                />
                <input
                  name="City"
                  className="form-input"
                  type="text"
                  placeholder="العنوان"
                  required
                />
                <input
                  name="husband_name"
                  className="form-input"
                  type="text"
                  placeholder="اسم الزوج"
                  required
                />
                <input
                  name="husband_phone"
                  className="form-input"
                  type="text"
                  placeholder="رقم هاتف الزوج"
                  pattern="\d{10}"
                  title="الرجاء ادخال 10 أرقام فقط"
                  required
                />
              </>
            )}
            {userType === "طفل" && (
              <>
                <select name="gender" className="form-input" required>
                  <option value="">الجنس</option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
                <input name="DOB" className="form-input" type="date" required />
                <input
                  name="Child_Serial_No"
                  className="form-input"
                  type="text"
                  placeholder="الرقم التسلسلي للطفل"
                  required
                />
                <select name="blood_type" className="form-input" required>
                  <option value="">فصيلة الدم</option>
                  <option value="A">A</option>
                  <option value="A+">A+</option>
                  <option value="AB">AB</option>
                  <option value="A-">A-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                </select>
                <label>
                  <select name="allergy" className="form-input " required>
                    <option value="">الحساسية</option>
                    <option value="1">نعم</option>
                    <option value="0">لا</option>
                  </select>
                </label>
                <input
                  name="mom_ID"
                  className="form-input"
                  type="text"
                  placeholder="رقم هوية الأم"
                  pattern="\d{9}"
                  title="الرجاء ادخال 9 أرقام فقط"
                  required
                />
              </>
            )}
            {userType === "طبيب" && (
              <>
                <input
                  name="medical_ID_No"
                  className="form-input"
                  type="text"
                  placeholder="الرقم الطبي التسلسلي"
                  required
                />
                <input
                  name="phone_No"
                  className="form-input"
                  type="text"
                  placeholder="رقم الهاتف"
                  pattern="\d{10}"
                  title="الرجاء ادخال 10 أرقام فقط"
                  required
                />
              </>
            )}
            <button className="submit-button" type="submit">
              إضافة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
