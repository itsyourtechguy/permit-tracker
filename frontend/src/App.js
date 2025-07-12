import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddPermitModal from "./components/Modal/AddPermitModal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthModal from "./components/Modal/AuthModal";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
        <AuthModal />
        <AddPermitModal />
      </div>
    </Router>
  );
}

export default App;
