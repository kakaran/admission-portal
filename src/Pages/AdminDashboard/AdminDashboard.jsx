import AdminTable from "../../Components/AdminTable/AdminTable";
import Navbar from "../../Components/Navbar/Navbar";
import SubHeader from "../../Components/SubHeader";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <SubHeader />
      <main className="grid place-content-center">
        <AdminTable />
      </main>
    </>
  );
};

export default AdminDashboard;
