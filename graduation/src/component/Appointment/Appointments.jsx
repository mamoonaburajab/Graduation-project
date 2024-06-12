import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Appointment.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ar-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  return days[date.getDay()];
};

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:3121/api/administrative_manager/AppointmentManager"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();

      const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

      // Filter out past appointments
      const filteredAppointments = data.filter(appointment => {
        const appointmentDate = new Date(appointment.date).toISOString().slice(0, 10);
        return appointmentDate >= today;
      });

      setAppointments(filteredAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <TableContainer component={Paper} className="tableDoc" id="tableDocpage">
      <Table
        sx={{ minWidth: 700, direction: "rtl" }}
        aria-label="customized table"
        className="tableDocpage"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">الاسم</StyledTableCell>
            <StyledTableCell align="right">التاريخ</StyledTableCell>
            <StyledTableCell align="right">اليوم</StyledTableCell>
            <StyledTableCell align="right">الوقت</StyledTableCell>
            <StyledTableCell align="right">سجل الطفل</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((row) => (
            <StyledTableRow key={row.ID}>
              <StyledTableCell component="th" scope="row" align="right">
                {row.mother_name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {formatDate(row.date)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {getDayOfWeek(row.date)}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Time}</StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="contained" color="primary">
                  <Link to={`/doctor/child/${row.childId}`} style={{ color: 'white', textDecoration: 'none' }}>
                    سجل الطفل
                  </Link>
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Appointment;
