import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <div className="app-layout">
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
