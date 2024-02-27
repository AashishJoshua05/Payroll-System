import UserProvider from "./UserContext";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmployeeForm from "./components/EmployeeForm";
import PrivateRoutes from "./components/PrivateRoutes";

export default function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/employeeForm" element={<EmployeeForm />} />
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}
