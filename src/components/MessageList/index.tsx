import styles from "./styles.module.scss";
import logoImage from "../../assets/logo.svg";
import { io } from "socket.io-client";
import { api} from "../../services/api";
import { useEffect, useState } from "react";

const messagesQueue: Message[] = [];

const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage: Message) => {
messagesQueue.push(newMessage)
})

export function MessageList() {
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        const timer = setInterval(() => {
            if(messagesQueue.length > 0){
                setMessages(prevState => [
                    messagesQueue[0],
                    prevState[0],
                    prevState[1],
                ].filter(Boolean))
                messagesQueue.shift()
            }
        }, 3000)
    }, [])

    useEffect(() => {
        api.get<Message[]>('messages/last3').then( response => {
            setMessages(response.data)
        })
    }, [])
    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImage} alt="DoWhile 2021" />
            <ul className={styles.messageList}>
                {messages.map((message: Message) => {
                     return (
                        <li className={styles.message} key={message.id}>
                        <p className={styles.messageContent}>
                           {message.text}
                        </p>
                        <div className={styles.messageUser}>
                            <div className={styles.userImage}>
                                <img src={message.user.avatar_url} alt={message.user.name} />
                            </div>
                            <span>{message.user.name}</span>
                        </div>
                    </li>
                     )
                })}
            </ul>
        </div>
    );
}