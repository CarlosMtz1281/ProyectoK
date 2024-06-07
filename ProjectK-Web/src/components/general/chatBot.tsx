import React, { use, useEffect, useState } from "react";
import "../../styles/chatBot.css";
import { set } from "firebase/database";
import { time } from "console";
import { getCookie } from "@/app/utils/getcookie";
import axios from "axios";
import { headers } from "next/headers";
import ReactMarkdown from "react-markdown";

import { IoIosClose } from "react-icons/io";
import { LuSendHorizonal } from "react-icons/lu";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { Loading } from "react-loading-dot";

interface ChatBotProps {
  question: string;
}

interface Message {
  role: "user" | "model";
  parts: [
    {
      text: string;
    }
  ];
}

const ChatBot: React.FC<ChatBotProps> = ({ question }) => {
  const [chatStarted, setChatStarted] = useState(false);
  const[closing, setClosing] = useState(false)
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([] as Message[]);
  const [newMessage, setNewMessage] = useState("");
  const [waitingResponse, setWaitingResponse] = useState(true);
  const [history, setHistory] = useState([
    {
      role: "user",
      parts: [
        {
          text: `Estas es un chat con un estudiante que constesto un quiz de  te va a hacer preguntas sobre varios temas`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Perfecto, como puedo ayudarte",
        },
      ],
    },
  ] as Message[]);

  const api = process.env.NEXT_PUBLIC_API_URL;

  //start chat only once
  async function startChat() {
    if (chatStarted) return;
    const userCookiesObj = JSON.parse(await getCookie("userCookies"));
    const sessionKey = userCookiesObj.sessionKey;

    console.log("session", sessionKey);
    console.log("Starting chat...");
    const dataToSend = {
      history: history,
      message: question,
    };
    // set messages visible on chat
    setMessages([
      {
        role: "user",
        parts: [
          {
            text: `Explicame esta pregunta, ${question}`,
          },
        ],
      },
    ]);

    console.log(api + "chatbot/");
    axios
      .post(api + "chatbot/", {
        headers: { sessionKey: sessionKey },
        data: dataToSend,
      })
      .then((res) => {
        console.log("RESPONSE OF GEMINI", res.data);

        setHistory([
          {
            role: "user",
            parts: [
              {
                text: question,
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: res.data.message,
              },
            ],
          },
        ]);
        setMessages([
          {
            role: "user",
            parts: [
              {
                text: question,
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: res.data.message,
              },
            ],
          },
        ]);
        setChatStarted(true);
      })
      .catch((err) => {
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
    let message = newMessage;
    //update messages
    setMessages([
      ...messages,
      {
        role: "user",
        parts: [
          {
            text: newMessage,
          },
        ],
      },
    ]);

    setNewMessage("");
    axios
      .post(api + "chatbot", {
        data: dataToSend,
        headers: { sessionKey: sessionKey },
      })
      .then((res) => {
        console.log("RESPONSE OF GEMINI", res.data.message);
        setHistory((prevHistory) => [
          ...prevHistory,
          {
            role: "user",
            parts: [
              {
                text: message,
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: res.data.message || "",
              },
            ],
          },
        ]);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "model",
            parts: [
              {
                text: res.data.message || "",
              },
            ],
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    startChat();
  }, []);

const handleClose = () => {
    //wait a sec
    setClosing(true);
    setTimeout(() => {
        setIsOpen(false);
    }, 1000); // add a 1 sec delay
};

  async function handlNewMessage() {}

  return (
    <>
      {isOpen && (
        <div className={`chatbot ${closing ? "closing" : ""}`}>
          <div className="chatbot-header">
            <div className="chatbot-prompt">
              <FaChalkboardTeacher size={30} />
              Profesor Virtual
            </div>
            <button className="chatbot-close" onClick={handleClose}>
              <IoIosClose size={30} />
            </button>
          </div>

          <div
            className="chatbot-messages"
            ref={(el) => {
              if (el) el.scrollTop = el.scrollHeight;
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message ${
                  message.role === "user"
                    ? "chatbot-message-user"
                    : "chatbot-message-bot"
                }`}
              >
                <strong>
                  {message.role === "user" ? "Alumno" : "Profesor Virtual"}:
                </strong>
                <ReactMarkdown>{message.parts[0].text}</ReactMarkdown>
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
                  handlNewMessage();
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage} className="sendButton">
              <LuSendHorizonal size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
