import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./pages/Order";
import NewOrder from "./pages/NewOrder";
import EditOrder from "./pages/EditOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Order />} />
        <Route path="new-order" element={<NewOrder />} />
        <Route path="edit-order" element={<EditOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
