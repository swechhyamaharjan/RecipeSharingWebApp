import { Outlet } from "react-router";
import AdminSidebar from "../components/AdminSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-6">
        <Outlet />
        <ToastContainer />
      </main>
    </div>
  );
};

export default AdminLayout;
