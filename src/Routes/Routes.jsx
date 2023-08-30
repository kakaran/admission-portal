import SingleTable from "../Pages/Single/SingleTable";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import StudentDashbord from "../Pages/Dashbords/StudentDashbord";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup/Signup";

const CommonRoutes = [
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "*", element: <Login /> },
];

const AdminRoutes = [
  { path: "/Dashbord", element: <AdminDashboard /> },
  { path: "student/:id", element: <SingleTable /> },
];

const StudentRoutes = [{ path: "/Dashbord", element: <StudentDashbord /> }];

const routes = (role, isSignedIn) => {
  const SignedInList = role === "Admin" ? AdminRoutes : StudentRoutes;
  return isSignedIn ? [...SignedInList, ...CommonRoutes] : [...CommonRoutes];
};

export default routes;
