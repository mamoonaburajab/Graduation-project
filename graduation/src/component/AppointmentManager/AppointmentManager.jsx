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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import "./AppointmentManager.css";

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

const CustomButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:focus': {
    outline: 'none',
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  minWidth: 120,
  backgroundColor: theme.palette.background.paper,
  '& .MuiSelect-select': {
    padding: theme.spacing(1),
  },
}));

const getStatusLabel = (status) => {
  if (status === 1) return "تم";
  if (status === 0) return "ملغي";
  return "مستقبلي";
};

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [displayedAppointments, setDisplayedAppointments] = useState([]);
  const [showOld, setShowOld] = useState(false);
  const [showFuture, setShowFuture] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const oldAppts = appointments.filter(
      (appointment) => new Date(appointment.date) < currentDate
    );
    const futureAppts = appointments.filter(
      (appointment) => new Date(appointment.date) >= currentDate
    );

    if (showOld) {
      setDisplayedAppointments(oldAppts);
    } else if (showFuture) {
      setDisplayedAppointments(futureAppts);
    } else {
      setDisplayedAppointments([]);
    }
  }, [appointments, showOld, showFuture]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:3121/api/administrative_manager/AppointmentManager"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleShowOld = async () => {
    if (hasUnsavedChanges) {
      await saveStatusUpdates();
    }
    setShowOld(true);
    setShowFuture(false);
  };

  const handleShowFuture = async () => {
    if (hasUnsavedChanges) {
      await saveStatusUpdates();
    }
    setShowOld(false);
    setShowFuture(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [id]: newStatus }));
    setHasUnsavedChanges(true);
  };

  const saveStatusUpdates = async () => {
    const updatePromises = Object.keys(statusUpdates).map((id) => {
      const newStatus = statusUpdates[id];
      return fetch(
        `http://localhost:3121/api/administrative_manager/updateAppointmentStatus/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
    });

    try {
      await Promise.all(updatePromises);
      fetchAppointments(); // Refresh appointments after successful updates
      setStatusUpdates({});
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error updating appointment statuses:", error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', color:'#FFF' }}>
        <CustomButton variant="contained" onClick={handleShowFuture}>
          عرض المواعيد المستقبلية
        </CustomButton>
        <CustomButton variant="contained" onClick={handleShowOld}>
          عرض المواعيد القديمة
        </CustomButton>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, direction: "rtl" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">اسم الأم</StyledTableCell>
              <StyledTableCell align="right">التاريخ</StyledTableCell>
              <StyledTableCell align="right">اليوم</StyledTableCell>
              <StyledTableCell align="right">الوقت</StyledTableCell>
              <StyledTableCell align="right">الحالة</StyledTableCell>
              {showFuture && <StyledTableCell align="right">تغيير الحالة</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedAppointments.map((row) => (
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
                  {getStatusLabel(row.status)}
                </StyledTableCell>
                {showFuture && (
                  <StyledTableCell align="right">
                    <FormControl>
                      <InputLabel>الحالة</InputLabel>
                      <CustomSelect
                        value={statusUpdates[row.ID] !== undefined ? statusUpdates[row.ID] : row.status}
                        onChange={(e) => handleStatusChange(row.ID, e.target.value)}
                      >
                        <MenuItem value={1}>تم</MenuItem>
                        <MenuItem value={0}>ملغي</MenuItem>
                        <MenuItem value={null}>مستقبلي</MenuItem>
                      </CustomSelect>
                    </FormControl>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AppointmentManager;
