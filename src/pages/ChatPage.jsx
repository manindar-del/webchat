import ChatBox from "../components/ChatBox"
import Sidebar from "../components/Sidebar"

const ChatPage = ({ user, chatId, setChatId }) => {
    return (
        <div className="main-layout">
            <div className="side-section">
                <Sidebar user={user} chatId={chatId} setChatId={setChatId} />
            </div>

            <div className="chat-section">
                <ChatBox chatId={chatId} setChatId={setChatId} />
            </div>
        </div>
    )



}

export default ChatPage

