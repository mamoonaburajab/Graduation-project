import { lazy } from "react";
import ChildCard from "../component/childCard/childCard";
import NotFound from "../component/NotFound/NotFound";
import Profile from "../component/profile/Profile";

const Login = lazy(() => import("../pages/Login/Login"));
const Home = lazy(() => import("../pages/Mother/Home/Home"));
const Notes = lazy(() => import("../pages/Mother/Note/Note"));
const Vac = lazy(() => import("../pages/Mother/Vac/Vac"));
const HomeD = lazy(() => import("../pages/Doctor/HomeD/HomeD"));
const Child = lazy(() => import("../pages/Doctor/child/Child"));
const AppointmentPage = lazy(() =>
  import("../pages/Doctor/AppointmentPage/AppointmentPage")
);
const ChildMeasurDoc = lazy(() =>
  import("../pages/Doctor/ChildMeasurDoc/ChildMeasurDoc")
);
const Home_manager = lazy(() =>
  import("../pages/administrative_Manager/Home/Home")
);
const MotherChildCard = lazy(() =>
  import(
    "/home/mamoon/graduation folder/graduation/src/component/MotherChildCard/MotherChildCard.jsx"
  )
);
const BookAppointment = lazy(() =>
  import("../component/BookAppointment/BookAppointment")
);
const ViewAppointments = lazy(() =>
  import("../component/ViewAppointments/ViewAppointments")
);
const Guast = lazy(() => import("../pages/guast/Guast"));
const ProfileM = lazy(() => import("../pages/Mother/Prfile/profile"));
const AddUserPage = lazy(() =>
  import("../pages/administrative_Manager/AddUserPage/AddUserPage")
);
const AppointmentManagerPage = lazy(() =>
  import(
    "../pages/administrative_Manager/AppointmentManagerPage/AppointmentManagerPage"
  )
);
const AddArticlePage = lazy(() =>
  import("../pages/administrative_Manager/addArticlePage/AddArticlePage")
);
const ChildInfoPage = lazy(() =>
  import("../pages/Doctor/ChildInfoPage/ChildInfoPage")
);
const Admin = lazy(() => import("../pages/Admin/Admin"));
const VacDoctorPage = lazy(() =>
  import("../pages/Doctor/VacDoctorPage/VacDoctorPage")
);
const ComparisonChildPage = lazy(() =>
  import("../pages/Mother/ComparisonChildPage/ComparisonChildPage")
);
const StatisticsPage = lazy(() =>
  import("../pages/Doctor/StatisticsPage/StatisticsPage")
);
const ForgotPassword = lazy(() => import('../component/LoginForm/ForgotPassword'));
const routes = [
  { path: "/", element: <Guast /> },
  { path: "/login", element: <Login /> },
  { path: "/mother/home", element: <Home /> },
  { path: "/mother/MotherChildCard/Note/:childId", element: <Notes /> },
  { path: "/mother/MotherChildCard/Vac/:childId", element: <Vac /> },
  { path: "/doctor/home", element: <HomeD /> },
  { path: "/doctor/child", element: <Child /> },
  { path: "/doctor/appointments", element: <AppointmentPage /> },
  { path: "/doctor/measurement", element: <ChildMeasurDoc /> },
  { path: "/administrative_manager/home", element: <Home_manager /> },
  { path: "/mother/MotherChildCard", element: <MotherChildCard /> },
  {
    path: "/mother/MotherChildCard/childCard/:childId",
    element: <ChildCard />,
  },
  { path: "/mother/Appointment", element: <BookAppointment /> },
  { path: "/mother/ViewApp", element: <ViewAppointments /> },
  { path: "*", element: <NotFound /> },
  { path: "/guast", element: <Guast /> },
  { path: "/Mother/profile", element: <ProfileM /> },
  { path: "/administrative_manager/AddUserPage", element: <AddUserPage /> },
  {
    path: "/administrative_manager/AppointmentManagerPage",
    element: <AppointmentManagerPage />,
  },
  {
    path: "/administrative_manager/AddArticlePage",
    element: <AddArticlePage />,
  },
  {
    path: "/doctor/child/ChildInfoPage",
    element: <ChildInfoPage />,
  },
  {
    path: "/System_administrator/home",
    element: <Admin />,
  },
  {
    path: "/Doctor/child/Vac/:childId",
    element: <VacDoctorPage />,
  },
  {
    path: "/mother/MotherChildCard/childCard/ComparisonChild",
    element: <ComparisonChildPage />,
  },
  { path: "/forgotPassword", element: <ForgotPassword /> },
  { path: "//doctor/statistics", element: <StatisticsPage /> },
];

export default routes;
