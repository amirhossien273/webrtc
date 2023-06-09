import { Routes, Route, Navigate } from "react-router-dom";
import { RoomPage, LobbyPage, LoginPage } from "./pages";

function App() {

  return (
    <Routes>
      <Route path="/" element={<LobbyPage />} />
      <Route path="/login/:userID" element={<LoginPage />} />
      <Route path="/room/:roomID" element={<RoomPage />} />
    </Routes>
  );
}

export default App;
