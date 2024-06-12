import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button, message, Tabs } from "antd";
import "./ViewAppointments.css";
import NavbarM from "../navbarMom/NavbarM";
import axios from "axios";

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US"); // Adjust the locale and options as needed
};

// Helper function to get the day of the week
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-EG", { weekday: "long" }); // 'ar-EG' for Arabic day names
};

const getStatusTag = (status) => {
  switch (status) {
    case 0:
      return <Tag color="volcano">ملغاة</Tag>; // Cancelled
    case 1:
      return <Tag color="green">مكتملة</Tag>; // Done
    default:
      return <Tag color="geekblue">قادم</Tag>; // Upcoming
  }
};

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState({
    upcomingAppointments: [],
    pastAppointments: [],
  });
  const [activeTab, setActiveTab] = useState("upcoming"); // State to manage the active tab
  const motherId = localStorage.getItem("userId"); // Assuming mother's ID is stored in local storage

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.post(
          `http://localhost:4504/Mother/ViewApp`,
          { motherId } // Sending motherId in the request body
        );
        const formattedData = {
          upcomingAppointments: response.data.upcomingAppointments.map(
            (appointment) => ({
              ...appointment,
              date: formatDate(appointment.date),
              day: getDayOfWeek(appointment.date),
              time: appointment.Time, // Assuming time is in the format "HH:MM:SS"
              status: appointment.status, // Adding status
            })
          ),
          pastAppointments: response.data.pastAppointments.map(
            (appointment) => ({
              ...appointment,
              date: formatDate(appointment.date),
              day: getDayOfWeek(appointment.date),
              time: appointment.Time, // Assuming time is in the format "HH:MM:SS"
              status: appointment.status, // Adding status
            })
          ),
        };
        setAppointments(formattedData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [motherId]);

  const handleDelete = async (key) => {
    try {
      await axios.delete(`http://localhost:4504/Mother/ViewApp/${key}`);
      message.success("Appointment deleted successfully");
      setAppointments((prevAppointments) => ({
        ...prevAppointments,
        upcomingAppointments: prevAppointments.upcomingAppointments.filter(
          (appointment) => appointment.id !== key
        ),
        pastAppointments: prevAppointments.pastAppointments.filter(
          (appointment) => appointment.id !== key
        ),
      }));
    } catch (error) {
      console.error("Error deleting appointment:", error);
      message.error("Failed to delete appointment");
    }
  };

  const upcomingColumns = [
    {
      title: "الإجراءات", // Actions
      key: "actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleDelete(record.id)}>
            حذف
          </Button>
        </Space>
      ),
      fixed: "left", // This will fix the column to the left
    },
    {
      title: "حالة الموعد",
      key: "status",
      dataIndex: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "الوقت",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "اليوم",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
    },
  ];

  const pastColumns = [
    {
      title: "حالة الموعد",
      key: "status",
      dataIndex: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "الوقت",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "اليوم",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div className="container">
      <NavbarM />
      <div className="tabs-container">
        <Tabs defaultActiveKey="upcoming" onChange={setActiveTab}>
          <Tabs.TabPane tab="المواعيد القادمة" key="upcoming">
            <Table
              columns={upcomingColumns}
              dataSource={appointments.upcomingAppointments}
              scroll={{ x: 1000 }}
              rowKey="id"
              loading={!appointments.upcomingAppointments.length} // Show loading indicator until data is loaded
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="المواعيد السابقة" key="past" className="">
            <Table
              columns={pastColumns}
              dataSource={appointments.pastAppointments}
              scroll={{ x: 1000 }}
              rowKey="id"
              loading={!appointments.pastAppointments.length} // Show loading indicator until data is loaded
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <div className="table-container">
        {/* Empty div to maintain the structure */}
      </div>
    </div>
  );
};

export default ViewAppointments;
