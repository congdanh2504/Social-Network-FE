import React from 'react'
import { io } from "socket.io-client";

const socket = io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] })
export default function Chat() {
    return<div className='container'>hello</div>
}
