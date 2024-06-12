// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mysql = require('mysql2');

// const app = express();
// const PORT = 3125;

// app.use(cors());
// app.use(bodyParser.json());

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'mamoon',
//   password: 'mamoon',
//   database: 'Clinic'
// });

// db.connect(error => {
//   if (error) throw error;
//   console.log('Database connected successfully.');
// });

// // Endpoint to get child details and their measurements
// app.get('/api/measurements/:childId', (req, res) => {
//   const { childId } = req.params;

//   const query = `
//     SELECT c.*, m.name, cm.measures_value, cm.date
//     FROM Child c
//     JOIN Child_measurements cm ON c.ID = cm.child_id
//     JOIN Measurements m ON cm.measurement_id = m.ID
//     WHERE c.ID = ?
//     ORDER BY cm.date DESC;
//   `;

//   db.query(query, [childId], (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: 'Database query failed' });
//     }
//     res.json(results);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
