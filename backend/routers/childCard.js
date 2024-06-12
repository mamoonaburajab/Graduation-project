const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/getChildID", (req, res) => {
    const mom_ID = req.query.mom_ID; // Assume mom_ID is passed as a query parameter

    if (!mom_ID) {
      return res.status(400).send("معرف الأم لم يتم توفيره.");
    }

    const query = "SELECT child_ID FROM your_table WHERE mom_ID = ?";

    db.query(query, [mom_ID], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send("خطأ داخلي في الخادم");
      }

      if (results.length === 0) {
        return res
          .status(404)
          .send("لم يتم العثور على معرف الطفل لمعرف الأم المحدد");
      }

      const childID = results[0].child_ID;
      res.json({ childID });
    });
  });

  return router;
};
