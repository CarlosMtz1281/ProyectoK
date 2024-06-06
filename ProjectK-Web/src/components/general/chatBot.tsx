import React, { useState } from 'react';

interface ChatBotProps {
    prompt: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ prompt }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        width: '300px',
                        height: '400px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '10px',
                        padding: '10px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <div>{prompt}</div>
                    <button onClick={handleClose}>Close</button>
                </div>
            )}
        </>
    );
};

export default ChatBot;