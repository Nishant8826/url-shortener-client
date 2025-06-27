import { Routes, Route, Navigate } from "react-router-dom";
import Shortener from "./pages/Shortener";
import "./App.css";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProtectedRoutes from "./ProtectedRoutes";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Shortener />} />
      <Route path="/analytics" element={<ProtectedRoutes><AnalyticsPage /></ProtectedRoutes>} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  )
}

export default App;
