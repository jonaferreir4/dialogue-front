import { Routes, Route } from "react-router-dom"
import { Chat } from "./pages/chat"
import { Welcome } from "./pages/welcome"
import { JoinRoom } from "./pages/join-room"

function App() {

  return (
    <div>
      <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/join-room" element={<JoinRoom/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/welcome" element={<Welcome/>}/>
        <Route path="/join-room" element={<JoinRoom/>}/>
      </Routes>
    </div>
  )
}

export default App
