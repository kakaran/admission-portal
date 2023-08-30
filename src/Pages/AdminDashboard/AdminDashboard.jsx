import AdminTable from "../../Components/AdminTable/AdminTable";
import Navbar from "../../Components/Navbar/Navbar";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <main className="grid place-content-center">
        <AdminTable />
      </main>
    </>
  );
};

export default AdminDashboard;
