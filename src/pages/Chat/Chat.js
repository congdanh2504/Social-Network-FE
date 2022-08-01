import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../../firebase/firebase";
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    Timestamp,
    orderBy,
    setDoc,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "../../components/Chat/User";
import MessageForm from "../../components/Chat/MessageForm";
import Message from "../../components/Chat/Message";
import './index.css'

/* const socket = io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] }) */
export default function Chat() {
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState("");
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [user1, setuser1] = useState("");

    useEffect(() => {
        if (auth.currentUser) {
            setuser1(auth.currentUser.uid)
        }
    }, [])

    useEffect(() => {
        const usersRef = collection(db, "users");
        // create query object
        const q = query(usersRef, where("uid", "not-in", [user1]))
        // execute query
        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setUsers(users);
        });
        return () => unsub();
    }, []);

    const selectUser = async (user) => {
        setChat(user);

        const user2 = user.uid;
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

        const msgsRef = collection(db, "messages", id, "chat");
        const q = query(msgsRef, orderBy("createdAt", "asc"));

        onSnapshot(q, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push(doc.data());
            });
            setMsgs(msgs);
        });

        // get last message b/w logged in user and selected user
        const docSnap = await getDoc(doc(db, "lastMsg", id));
        // if last message exists and message is from selected user
        if (docSnap.data() && docSnap.data().from !== user1) {
            // update last message doc, set unread to false
            await updateDoc(doc(db, "lastMsg", id), { unread: false });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user2 = chat.uid;

        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

        let url;
        if (img) {
            const imgRef = ref(
                storage,
                `images/${new Date().getTime()} - ${img.name}`
            );
            const snap = await uploadBytes(imgRef, img);
            const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
            url = dlUrl;
        }

        await addDoc(collection(db, "messages", id, "chat"), {
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || "",
        });

        await setDoc(doc(db, "lastMsg", id), {
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || "",
            unread: true,
        });

        setText("");
        setImg("");
    };
    return (
        <div class="container mx-auto">
            <div class="min-w-full border rounded lg:grid lg:grid-cols-3">
                <div class="border-r border-gray-300 lg:col-span-1">
                    <div class="mx-3 my-3">
                        <div class="relative text-gray-600">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    viewBox="0 0 24 24" class="w-6 h-6 text-gray-300">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </span>
                            <input type="search" class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none" name="search"
                                placeholder="Search" required />
                        </div>
                    </div>

                    <ul class="overflow-auto h-[32rem]">
                        <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                        <li>
                            {users.map((user) => (
                                <User
                                    key={user.uid}
                                    user={user}
                                    selectUser={selectUser}
                                    user1={user1}
                                    chat={chat}
                                />
                            ))}
                        </li>
                    </ul>
                </div>
                <div class="hidden lg:col-span-2 lg:block">
                    <div class="w-full">
                        <div class="relative flex items-center p-3 border-b border-gray-300">
                            <img class="object-cover w-10 h-10 rounded-full"
                                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
                            <span class="block ml-2 font-bold text-gray-600">Emma</span>
                            <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                            </span>
                        </div>
                        <div className="messages_container">
                            {chat ? (
                                <>
                                    {/* <div className="messages_user">
                                        <h3>{chat.name}</h3>
                                    </div>  */}
                                    <div className="messages">
                                        {msgs.length
                                            ? msgs.map((msg, i) => (
                                                <Message key={i} msg={msg} user1={user1} />
                                            ))
                                            : null}
                                    </div>
                                    <MessageForm
                                        handleSubmit={handleSubmit}
                                        text={text}
                                        setText={setText}
                                        setImg={setImg}
                                    />
                                </>
                            ) : (
                                <h3 className="no_conv">Select a user to start conversation</h3>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
        /*  <div className="home_container">
             <div className="users_container">
                 {users.map((user) => (
                     <User
                         key={user.uid}
                         user={user}
                         selectUser={selectUser}
                         user1={user1}
                         chat={chat}
                     />
                 ))}
             </div>
             <div className="messages_container">
                 {chat ? (
                     <>
                         <div className="messages_user">
                             <h3>{chat.name}</h3>
                         </div>
                         <div className="messages">
                             {msgs.length
                                 ? msgs.map((msg, i) => (
                                     <Message key={i} msg={msg} user1={user1} />
                                 ))
                                 : null}
                         </div>
                         <MessageForm
                             handleSubmit={handleSubmit}
                             text={text}
                             setText={setText}
                             setImg={setImg}
                         />
                     </>
                 ) : (
                     <h3 className="no_conv">Select a user to start conversation</h3>
                 )}
             </div>
         </div> */
    );
}
