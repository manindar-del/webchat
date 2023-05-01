import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {BrowserRouter as Router} from 'react-router-dom';
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/chatBox";
import Welcome from "./components/Welcome";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
       <Router>
      <NavBar />
      {!user ? <Welcome /> : <ChatBox />}
      </Router>
    </div>
  );
}
export default App;