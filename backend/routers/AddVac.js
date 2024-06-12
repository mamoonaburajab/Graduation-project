const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 5012;

app.use(bodyParser.json());
app.use(cors()); // Allow all origins

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "mamoon",
  password: "mamoon",
  database: "Clinic",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

app.post("/Doctor/child/Vac/:child_id", (req, res) => {
  const childId = req.params.child_id;
  const { formType, ...formData } = req.body;
  const date = new Date().toISOString().slice(0, 19).replace("T", " "); // current date in MySQL format

  let query = "";
  let values = [];

  switch (formType) {
    case "afterBirth":
      query = `
        INSERT INTO After_Birth (Date, BCG, BCG_ID, Doctor_Name, Child_id)
        VALUES (?, ?, ?, ?, ?)
      `;
      values = [
        date,
        formData.BCG ? 1 : 0,
        formData.BCG_ID,
        formData.Doctor_Name,
        childId,
      ];
      break;
    case "firstMonth":
      query = `
        INSERT INTO First_Month (Date, IPV, IPV_ID, Doctor_Name, Child_id)
        VALUES (?, ?, ?, ?, ?)
      `;
      values = [
        date,
        formData.IPV ? 1 : 0,
        formData.IPV_ID,
        formData.Doctor_Name,
        childId,
      ];
      break;
    case "secondMonth":
      query = `
        INSERT INTO Second_month (date, IPV, IPV_ID, OPV, OPV_ID, Rota_Virus, Rota_Virus_ID, Penta, Penta_ID, PCV, PCV_ID, Doctor_Name, Child_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      values = [
        date,
        formData.IPV ? 1 : 0,
        formData.IPV_ID,
        formData.OPV ? 1 : 0,
        formData.OPV_ID,
        formData.Rota_Virus ? 1 : 0,
        formData.Rota_Virus_ID,
        formData.Penta ? 1 : 0,
        formData.Penta_ID,
        formData.PCV ? 1 : 0,
        formData.PCV_ID,
        formData.Doctor_Name,
        childId,
      ];
      break;
    case "fourthMonth":
      query = `
          INSERT INTO Fourth_month (date, OPV, OPV_ID, Rota_Virus, Rota_Virus_ID, Penta, Penta_ID, PCV, PCV_ID, Doctor_Name, Child_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
      values = [
        date,
        formData.OPV ? 1 : 0,
        formData.OPV_ID,
        formData.Rota_Virus ? 1 : 0,
        formData.Rota_Virus_ID,
        formData.Penta ? 1 : 0,
        formData.Penta_ID,
        formData.PCV ? 1 : 0,
        formData.PCV_ID,
        formData.Doctor_Name,
        childId,
      ];
      break;
    case "sixthMonth":
      query = `
        INSERT INTO Sixth_month (date, OPV, OPV_ID, Rota_Virus, Rota_Virus_ID, Penta, Penta_ID, Doctor_Name, Child_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      values = [
        date,
        formData.OPV ? 1 : 0,
        formData.OPV_ID,
        formData.Rota_Virus ? 1 : 0,
        formData.Rota_Virus_ID,
        formData.Penta ? 1 : 0,
        formData.Penta_ID,
        formData.Doctor_Name,
        childId,
      ];
      break;
    case "twelfthMonth":
      query = `
            INSERT INTO Twelfth_month (date, PCV, PCV_ID, MMR, MMR_ID, Doctor_Name, Child_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
      values = [
        date,
        formData.PCV ? 1 : 0,
        formData.PCV_ID,
        formData.MMR ? 1 : 0,
        formData.MMR_ID,
        formData.Doctor_Name,
        childId,
      ];
      break;

    case "eighteenthMonth":
      query = `
          INSERT INTO Eighteenth_month (date, OPV, OPV_ID, MMR, MMR_ID, DPT, DPT_ID, Doctor_Name, Child_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
      values = [
        date,
        formData.OPV ? 1 : 0,
        formData.OPV_ID,
        formData.MMR ? 1 : 0,
        formData.MMR_ID,
        formData.DPT ? 1 : 0,
        formData.DPT_ID,
        formData.Doctor_Name,
        childId,
      ];
      break;
    default:
      return res.status(400).json({ message: "Invalid form type" });
  }

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error inserting data" });
    } else {
      res.status(200).json({ message: "Data inserted successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
