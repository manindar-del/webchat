// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { auth, db } from "../firebase";

// import { onAuthStateChanged } from "firebase/auth";

//  export const ChatList = async () => {
//   const user = auth.currentUser;

//   if (!user) {
//     console.log("User not ready yet");
//     return;
//   }

//   const uid = user.uid;

//   const docRef = await addDoc(
//     collection(db, "users", uid, "chats"),
//     {
//       title: "New Chat",
//       createdAt: serverTimestamp(),
//     }
//   );

//   setChatId(docRef.id);
// };