import AdminTable from "../../Components/AdminTable/AdminTable";
import Navbar from "../../Components/Navbar/Navbar";
import SubHeader from "../../Components/SubHeader";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf3f0] to-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <h1 className="text-[#9a031e] font-bold text-2xl">
          Student Applications
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Review and manage Management Quota admission submissions
        </p>
      </div>
      <SubHeader />
      <main className="max-w-6xl mx-auto px-4 pb-10">
        <AdminTable />
      </main>
    </div>
  );
};

export default AdminDashboard;
