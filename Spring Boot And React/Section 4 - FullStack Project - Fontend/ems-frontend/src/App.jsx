import "./App.css";
import Header from "./components/Header";
import ListEmployee from "./components/ListEmployee";
import Employee from "./components/Employee";
import Footer from "./components/Footer";
import ListDepartment from "./components/ListDepartment";
import Department from "./components/Department";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* http://localhost:3000 */}
          <Route path="/" element={<ListEmployee />} />
          {/* http://localhost:3000/employees */}
          <Route path="/employees" element={<ListEmployee />} />
          {/* http://localhost:3000/add-employee */}
          <Route path="/add-employee" element={<Employee />} />
          {/* http://localhost:3000/edit-employee/1 */}
          <Route path="/edit-employee/:id" element={<Employee />} />

          {/* http://localhost:3000/departments */}
          <Route path="/departments" element={<ListDepartment />} />
           {/* http://localhost:3000/add-department */}
           <Route path="/add-department" element={<Department />} />
           {/* http://localhost:3000/edit-department/1 */}
          <Route path="/edit-department/:id" element={<Department />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
