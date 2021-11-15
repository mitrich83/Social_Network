import React, {useEffect, useState} from 'react';

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string,
}

export const ChatPage = () => {
    return <div>
        <Chat/>
    </div>
}


export const Chat = () => {

    return <div>
        <Messages/>
        <AddMessagesForm/>
    </div>
}

export const Messages = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages)=> [...prevMessages, ...newMessages])
        })
    }, [])

    return <div style={{height: '400px', overflow: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}
export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return <div>
        <img src={message.photo} style={{width: '30px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
    </div>
}

export const AddMessagesForm = () => {
    const [message, setMessage] = useState('')
    const sendMessage = ()=> {
        if(!message) return
        ws.send(message)
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e)=> setMessage(e.currentTarget.value)} value={message}/>
        </div>
        <div>
            <button onClick={sendMessage}>send</button>
        </div>
    </div>
}
