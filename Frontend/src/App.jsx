import { UserContextProvider } from "./UserContext";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmployeeForm from "./components/EmployeeForm";

export default function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/employeeForm" element={<EmployeeForm />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}
