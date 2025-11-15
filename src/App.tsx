import { Routes, Route, Navigate } from "react-router-dom"
import { Chat } from "./pages/chat"
import { Welcome } from "./pages/welcome"
import { JoinRoom } from "./pages/join-room"
import { ChatProvider } from "./context/ChatContext"
function App() {

  return (
    <div>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/join-room" element={<JoinRoom/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/welcome" element={<Welcome/>}/>
        </Routes>
      </ChatProvider>
    </div>
  )
}

export default App
