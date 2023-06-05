import {  Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import {RoomPage, LobbyPages } from "./pages";

function App() {

  return (
    <Routes>
      <Route path="/" element={<LobbyPages />} />
      <Route path="/room/:roomID" element={<RoomPage />} />
    </Routes>
  );
}

export default App;
