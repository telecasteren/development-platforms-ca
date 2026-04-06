import { Outlet } from "react-router";
import Sidebar from "./components/sidebar/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <main className="sm:ml-64">
        <div className="mx-auto w-full max-w-5xl px-6 py-6 md:px-10 md:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
