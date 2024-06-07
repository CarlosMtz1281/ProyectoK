import React, { use, useEffect, useState } from "react";
import "../../styles/chatBot.css";
import { IoIosClose } from "react-icons/io";
import { set } from "firebase/database";
import { time } from "console";
import { getCookie } from "@/app/utils/getcookie";
import axios from "axios";
import { headers } from "next/headers";
import ReactMarkdown from "react-markdown";

interface ChatBotProps {
    question: string;
    quizName: string;
}

interface Message {
  role: "user" | "model";
  parts: [{
    text: string;
  }];
}

const ChatBot: React.FC<ChatBotProps> = ({ question, quizName }) => {

  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [history, setHistory] = useState([
    {
        role: "user",
        parts: [{
          text: `Estas es un chat con un estudiante que constesto un quiz de ${quizName} te va a hacer preguntas sobre varios temas`,
        }],
    },
    {
        role: "model",
        parts: [{
            text: "Perfecto, como puedo ayudarte"
        }],
      }
  ] as Message[]);
  const api = process.env.NEXT_PUBLIC_API_URL;

  //start chat only once
  async function startChat() {
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    const sessionKey = userCookiesObj.sessionKey;

    console.log("session", sessionKey)
    console.log("Starting chat...");
    const dataToSend = {
        history: history,
        message: question,
    };
    console.log(api+ "chatbot/")
    axios.post(api+ "chatbot/", {headers: {sessionKey: sessionKey}, data: dataToSend}).then((res) => {
        console.log("RESPONSE OF GEMINI",res.data);

        setHistory([
            ...history,
            {
                role: "user",
                parts: [{
                    text: question,
                }],
            },
            {
                role: "model",
                parts: [{
                    text: res.data.message,
                }],
            },
        ])

    }).catch((err) => {
        console.log(err);
    });
}
async function sendMessage() {
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    const sessionKey = userCookiesObj.sessionKey;
    console.log("Sending message");
    const dataToSend = {
        history: history,
        message: newMessage,
    };
    axios.post(api + "chatbot", {
        data: dataToSend,
        headers: {sessionKey: sessionKey},
    }).then((res) => {
        console.log("RESPONSE OF GEMINI",res.data.message);
        setHistory([
            ...history,
            {
                role: "user",
                parts: [{
                    text: newMessage,
                }],
            },
            {
                role: "model",
                parts: [{
                    text: res.data.message || "",
                }],
            },
        ]);
    }).catch((err) => {
        console.log(err);
    });
}

useEffect(() => {
    startChat();
}, []);

  const handleClose = () => {
    //wait a sec
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };



  return (
    <>
      {isOpen && (
        <div className={`chatbot ${isOpen ? "" : "closed"}`}>
          <div className="chatbot-header">
            <div className="chatbot-prompt">Profesor Virtual</div>
            <button className="chatbot-close" onClick={handleClose}>
              <IoIosClose size={30} />
            </button>
          </div>

        <div className="chatbot-messages">
            {history.map((message, index) => (
                <div
                    key={index}
                    className={`chatbot-message chatbot-message-${message.role}`}
                >
                    <strong>{message.role}:</strong>
                    <ReactMarkdown>
                        {message.parts[0].text}
                    </ReactMarkdown>
                </div>
            ))}
        </div>
          <div className="chatbot-input">
            <textarea
              className="chatbot-input-text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevents adding a new line when Enter is pressed
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage} className="m-2">Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
