import React from "react";
import NavbarM from "../../../component/navbarMom/NavbarM";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const getCellStyle = (value) => {
  switch (value) {
    case "متوسط":
      return { backgroundColor: "#FFFF99" }; // Yellow
    case "منخفض":
      return { backgroundColor: "#FF9999" }; // Red
    case "نقص":
      return { backgroundColor: "#FF9999" }; // Red
    case "طبيعي":
      return { backgroundColor: "#99FF99" }; // Green
    default:
      return {};
  }
};

const ComparisonChildPage = () => {
  const rows = [
    { name: "الوزن", myChild: "10kg", normalChild: "12kg", score: "متوسط" },
    { name: "الطول", myChild: "75cm", normalChild: "80cm", score: "منخفض" },
    {
      name: "محيط الرأس",
      myChild: "45cm",
      normalChild: "47cm",
      score: "منخفض",
    },
    {
      name: "فيتامين أ + د",
      myChild: "نقص",
      normalChild: "طبيعي",
      score: "نقص",
    },
    {
      name: "فيتامين أ",
      myChild: "طبيعي",
      normalChild: "طبيعي",
      score: "طبيعي",
    },
    { name: "الحديد", myChild: "نقص", normalChild: "طبيعي", score: "نقص" },
  ];

  return (
    <div>
      <NavbarM />
      <TableContainer
        component={Paper}
        style={{ margin: "100px auto", maxWidth: "800px", direction: "rtl" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">الاسم</TableCell>
              <TableCell align="right">طفلي</TableCell>
              <TableCell align="right">الطفل الطبيعي</TableCell>
              <TableCell align="right">العلامة</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.myChild}</TableCell>
                <TableCell align="right">{row.normalChild}</TableCell>
                <TableCell align="right" style={getCellStyle(row.score)}>
                  {row.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ComparisonChildPage;
