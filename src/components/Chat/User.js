import React, { useEffect, useState } from "react";
import Img from '../../assets/images/defaultAvt.png'
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const User = ({ user1, user, selectUser, chat }) => {
    const user2 = user?.uid;
    const [data, setData] = useState("");
    useEffect(() => {
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
            setData(doc.data());
            console.log(user)
        });
        return () => unsub();
    }, []);

    return (
        <>
            <div
                className={`user_wrapper ${chat.name === user.name && "selected_user"} flex p-[5px] cursor-pointer`}
                onClick={() => selectUser(user)}
            >
                <div className="user_info flex w-full">
                    <div class="relative">
                        <img src={user.avatar || Img} alt="avatar" className="avatar mr-[10px]" />
                        <div className={`user_status ${user.isOnline ? "online" : "offline"} bottom-1 right-3 absolute`}></div>
                    </div>
                    <div className="flex-1">
                        <div className="user_detail flex">
                            <h4>{user.username}</h4>
                            {data?.from !== user1 && data?.unread && (
                                <small className="unread">New</small>
                            )}
                        </div>
                        <div>
                            {data && (
                                <p className="truncate m-0">
                                    <strong>{data.from === user1 ? "You:" : null}</strong>
                                    {data.text}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div
                onClick={() => selectUser(user)}
                className={`sm_container ${chat.usename === user.username && "selected_user"}`}
            >
                <img
                    src={user.avatar || Img}
                    alt="avatar"
                    className="avatar sm_screen"
                />
            </div>

        </>
    );
};

export default User;
